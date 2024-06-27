import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10)

      //TODO: configure mail for usage
      
      if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userId, {
          $set: {verifyToken: hashedToken, verifyTokenExpire: Date.now() + 3600000}},
        )
      } else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId, {
          $set: {forgotPasswordToken: hashedToken, forgotPasswordTokenExpire: Date.now() + 3600000}},
        )
      }

      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1fc65460b9c647", // ❌
          pass: "53ecb2dd0d16db" // ❌
        }
      });

          const mailOptions = {
            from: 'kshitj@gehlot.ai', // sender address
            to: email, // list of receivers
            subject: emailType==='VERIFY' ? "VERIFY your email" : "Rest your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;

    } catch (error:any) {
        throw new Error(error);
    }
}
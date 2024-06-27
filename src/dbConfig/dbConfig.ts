import { log } from "console";
import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONG0_URI!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Connected to database")
        })

        connection.on("error", (error) => {
            console.log("Error connecting to database", error)
            process.exit()
        })
    } catch (error) {
        console.log('Error connecting to database', error);
        console.log('error');
    }
}
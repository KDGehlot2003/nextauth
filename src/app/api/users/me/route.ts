import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from "@/helpers/detDataFromToken";

connect()

export async function POST(request: NextRequest) {
    // extract data from token
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")
    //checl if there is no user
    return NextResponse.json({
        message: "User found",
        data: user
    })

}
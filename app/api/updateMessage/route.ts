import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const {  messageFromId } = body
        const messageRead = await prisma.messages.updateMany({
            where:{
                messageFromId,
            },
            data:{
                read:true
            }
           
        })
        
        return NextResponse.json({
            messageRead, message: 'Message retrieved'
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data: null, message: error })
    }
}




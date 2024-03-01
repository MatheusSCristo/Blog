import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const {  messageToId } = body
        const messages = await prisma.messages.findMany({
            where:{
                messageToId,
            },
            select:{
                read:true
            }
        })
      
        return NextResponse.json({
            data:messages, message: 'Messages retrieved'
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data: null, message: error })
    }
}




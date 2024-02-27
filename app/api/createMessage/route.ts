import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const { content, messageFromId, messageToId } = body
        const message = await prisma.messages.create({
            data: {
                content,
                messageFromId,
                messageToId,
                read: false
            }
        }
        )
        return NextResponse.json({
            data: message, message: 'Message sent'
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data: null, message: error })
    }
}




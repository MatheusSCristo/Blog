import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const {  messageFromId, messageToId } = body
        const messagesSent = await prisma.messages.findMany({
            where:{
                messageFromId,
                messageToId,
            }
        })
        const messageReceived= await prisma.messages.findMany({
            where:{
                messageFromId:messageToId,
                messageToId:messageFromId
            }
        })

        const data= messageReceived.concat( messagesSent)
        
        return NextResponse.json({
            data, message: 'Message retrieved'
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data: null, message: error })
    }
}




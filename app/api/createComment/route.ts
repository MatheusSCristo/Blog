import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const {content,postId,authorId}=body
        const comment= await prisma.comments.create({
            data:{
                content,
                authorId,
                postId,
                
            }
        })
        
        return NextResponse.json({ comment , message: 'Comment created' })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data:null , message: 'error' })

    }
}
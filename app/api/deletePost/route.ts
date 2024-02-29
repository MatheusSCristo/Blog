import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const {postId}=body
        const categories=await prisma.category.deleteMany({
            where:{
                postId
            }
        })
        const comments= await prisma.comments.deleteMany({
            where:{
                postId
            }
        })
        const post= await prisma.post.delete({
            where:{ 

                id:postId
            }
        })
        return NextResponse.json({ data:{post,categories,comments} , message: 'Post deleted' })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data:null , message: 'error' })

    }
}
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const posts = await prisma.post.findMany()
        return NextResponse.json({ data:posts , message: 'Posts achieved' })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data:null , message: 'error' })

    }
}
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body=await req.json()
        const {followedById}=body
        const users = await prisma.follows.findMany({
            where:{
                followedById
            },
            include:{
                following:true
            }
        })
        return NextResponse.json({
            data: users, message: 'Users found'
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data: null, message: error })
    }
}




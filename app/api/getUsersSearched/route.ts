import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body=await req.json()
        const {search}=body
        const users = await prisma.user.findMany({
            where:{
                username:{
                    contains:search,
                    mode: 'insensitive'
                }
            },
            select: {
                id:true,
                username: true,
                displayName: true,
                profileImg: true,
            }
        })
        return NextResponse.json({
            data: users, message: 'User found'
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data: null, message: error })
    }
}




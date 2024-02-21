import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const { id } = body
        const user = await prisma.user.findUnique({
            where: { id: id } 
        })
        return NextResponse.json({ data: {
            email:user?.email,
            username:user?.username,
            bio:user?.bio,
            createdAt:user?.createdAt,
            displayName:user?.displayName,
            profileImg:user?.profileImg,
            bgImg:user?.profileImg
        }, message: 'User found' })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data: null, message: error })
    }
}




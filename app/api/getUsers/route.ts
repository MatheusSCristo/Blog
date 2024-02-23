import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const users = await prisma.user.findMany({
            select: {
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




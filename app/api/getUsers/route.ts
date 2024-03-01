import prisma from "@/lib/prisma"
import { prismaExclude } from "@/utils/excludePass";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const users = await prisma.user.findMany({
            select: prismaExclude('User',['password'])
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




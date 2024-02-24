import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const { userId, profileId } = body

        const alreadyFollowed = await prisma.follows.findUnique({
            where: {
                followingId_followedById: {
                    followedById: userId,
                    followingId: profileId
                }
            }
        })
        if (alreadyFollowed) {
            const deleteFollow = await prisma.follows.delete({
                where: {
                    followingId_followedById: {
                        followedById: userId,
                        followingId: profileId
                    }
                }
            })
        return NextResponse.json({ message: 'User unfollowed' })
            
        }
        const post = await prisma.follows.create({
            data: {
                followedById: userId,
                followingId: profileId
            }
        })
        
        return NextResponse.json({message: 'User followed' })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ data: null, message: 'error' })
    }
}
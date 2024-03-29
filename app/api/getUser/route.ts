import prisma from "@/lib/prisma"
import { prismaExclude } from "@/utils/excludePass";
import { triggerAsyncId } from "async_hooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const { id } = body
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id
            },
            select: {
                email: true,
                bgImg: true,
                username: true,
                bio: true,
                createdAt: true,
                displayName: true,
                followedBy: true,
                following: true,
                profileImg: true,
                posts: {
                    include: {
                        comments: {
                            include: {
                                author: {
                                    select: prismaExclude('User', ['password'])
                                }
                            }
                        },
                        likes: true,
                        author: true,
                    }
                },
            }
        })
        return NextResponse.json({
            data: {
                email: user?.email,
                bgImg: user?.bgImg,
                username: user?.username,
                bio: user?.bio,
                createdAt: user?.createdAt,
                displayName: user?.displayName,
                followedBy: user?.followedBy,
                following: user?.following,
                posts: user?.posts,
                profileImg: user?.profileImg,
            }, message: 'User found'
        })
    }
    catch (error) {
        return NextResponse.json({ data: null, message: error })
    }
}




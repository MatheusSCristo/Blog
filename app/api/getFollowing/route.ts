import prisma from "@/lib/prisma"
import { prismaExclude } from "@/utils/excludePass";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        const { followedById } = body
        const users = await prisma.follows.findMany({
            where: {
                followedById
            },
            include: {
                following: {
                    select: {
                        id:true,
                        email: true,
                        bgImg: true,
                        username: true,
                        bio: true,
                        createdAt: true,
                        displayName: true,
                        followedBy: true,
                        following: true,
                        profileImg: true,
                        messageFrom: {
                            where: {
                                messageToId: followedById
                            },
                            include: {
                                messageFrom: {
                                    select: prismaExclude('User', ['password'])
                                }
                            }

                        },
                        messageTo: {
                            where: {
                                messageFromId: followedById
                            }, include: {
                                messageFrom: {
                                    select: prismaExclude('User', ['password'])
                                }
                            }

                        }
                    }
                }
            }

        }
        )

        return NextResponse.json({
            data: users, message: 'Users found'
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ data: null, message: error })
    }
}




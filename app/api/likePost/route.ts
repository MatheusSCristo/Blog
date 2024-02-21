import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(req: NextRequest, res: NextResponse) {
    if (req.method === 'PUT')
        try {
            const body = await req.json()
            const { postId, userId } = body
            const alreadyLiked = await prisma.like.findUnique({
                where: {
                    postId_userId: {
                        postId,
                        userId
                    }
                }
            })
            if (alreadyLiked) {
                const like = await prisma.like.delete({
                    where: {
                        postId_userId: {
                            postId,
                            userId
                        }
                    }
                })
                return NextResponse.json({ data: like, message: 'like decremented' })
            }
            const like = await prisma.like.create({
                data: {
                    postId: body.postId,
                    userId: body.userId
                }
            })

            return NextResponse.json({ data: like, message: 'like incremented' })
        }
        catch (error) {
            console.error(error)
            return NextResponse.json({ data: null, message: 'Internal error' })

        }
}

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === 'POST')
        try {
            const body = await req.json()
            const { postId,userId } = body
            const likes = await prisma.like.findMany({
                where: {
                    postId
                }
            }
            )
            const likedByUser = await prisma.like.findUnique({
                where: {
                    postId_userId: {
                        postId,
                        userId
                    }
                }
            })
            return NextResponse.json({ data: {likes,likedByUser}, message: 'Likes quantity' })
        }
        catch (error) {
            console.error(error)
            return NextResponse.json({ data: null, message: 'Internal error' })

        }
}


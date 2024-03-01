import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    if (req.method === 'PUT')
        try {
            const body = await req.json()
            const { userId, username,displayName,bio } = body
            if (username) {
                const userNameAlreadyExists = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })
                if (userNameAlreadyExists) {
                    return NextResponse.json({ data: null, message: 'Username already in use' }, { status:409 })

                }
            }

            const user=await prisma.user.findUnique({
                where:{
                    id:userId
                }
            })
            const updatedUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    username:username!==''?username:user?.username,
                    displayName:displayName!==''?displayName:user?.displayName,
                    bio:bio!==''?bio:user?.bio,
                }
            })

            return NextResponse.json({ data: updatedUser, message: 'Changes made' },{status:200})
        }
        catch (error) {
            console.error(error)
            return NextResponse.json({ data: null, message: 'Internal error' })

        }
}
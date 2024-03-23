import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { content, title, categories, authorId } = body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published: true,
      },
    });
    const { id } = post;
    categories.map(async (category:string) => {
      await prisma.category.create({
        data: {
          postId: id,
          category,
        },
      });
    });
    return NextResponse.json({
      data: { post, categories },
      message: "Post created",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: null, message: "error" });
  }
}

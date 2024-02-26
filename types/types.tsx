import { Category, Comments, Follows, Like, User } from "@prisma/client"

export type sessionsType = {
    user: {
        email?: string | null | undefined,
        name?: string | null | undefined,
        id?: string | null | undefined,
        image?: string | null | undefined,
    }

}

export type UserSearchType = {
    username: string,
    displayName: string,
    profileImg: string
    id: string
}


export type profileUserType = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    bio: string | null;
    displayName: string | null;
    profileImg: string | null;
    bgImg: string | null;
    posts: Post[],
    comments: Comments[],
    followedBy: Follows[],
    following: Follows[],

}

export type Post = {
    id: string;
    title: string;
    content: string | null;
    published: boolean;
    authorId: string;
    author:User
    createAt: Date;
    comments: Comment[]
    category: Category[]
    likes: Like[]
}

export interface Comment extends Comments{
    author:User
}
import { Category, Comments, Follows, Like } from "@prisma/client"

export type postCardParamsT = {
    post: any
    userId: string | null | undefined
}
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
    posts: Posts[],
    comments: Comments[],
    followedBy: Follows[],
    following: Follows[],

}

export type Posts = {
    id: string;
    title: string;
    content: string | null;
    published: boolean;
    authorId: string;
    createAt: Date;
    comments: Comments[]
    category: Category[]
    likes: Like[]
}

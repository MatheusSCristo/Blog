import { Category, Comments, Follows, Like, Messages, User } from "@prisma/client"

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
    comments: Comment[],
    followedBy: Follows[],
    following: Follows[],

}

export type Post = {
    id: string;
    title: string;
    content: string | null;
    published: boolean;
    authorId: string;
    author: User
    createAt: Date;
    comments: Comment[]
    category: Category[]
    likes: Like[]
}

export interface Comment extends Comments {
    author: User
}

export interface Follow extends Follows {
    following:
    {
        id: string,
        username: string,
        email: string,
        password: string,
        createdAt: string
        updatedAt: string,
        bio: string,
        displayName: string,
        profileImg: string,
        bgImg: string,
        messageFrom: Message[],
        messageTo: Message[]
    }

}


export interface Message  {
    messageFrom: User
    messageToId: string;
    messageFromId: string;
    createdAt:string;
    content: string;
    read: boolean;
    id: string;

}
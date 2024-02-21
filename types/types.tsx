export type postCardParamsT = {
    post: {
        id: string;
        title: string;
        content: string | null;
        published: boolean;
        authorId: string;
        createAt: string;
    } | undefined
    userId: String | null | undefined
}
export type sessionsType = {
    user: {
        email?: string | null | undefined,
        name?: string | null | undefined,
        id?: string | null | undefined,
        image?: string | null | undefined,
    }

}
export type PostsType = {
    id: string;
    title: string;
    content: string | null;
    published: boolean;
    authorId: string;
    createAt: string;
} 

export type AuthorType = {
    email: String,
    username: String,
    bio: String,
    createdAt: String,
    displayName: String,
    profileImg: String,
    bgImg: String,
}
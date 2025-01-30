
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface WhoamiInput {
    userId: string;
}

export interface DeleteInput {
    id: string;
}

export interface CreatePostInput {
    body: string;
    clerkUserId: string;
}

export interface LikePostInput {
    postId: string;
    userId: string;
}

export interface AddCommentInput {
    postId: string;
    userId: string;
    text: string;
}

export interface RegisterInput {
    clerkUserId: string;
    username: string;
    image?: Nullable<string>;
    email: string;
}

export interface User {
    _id: string;
    clerkUserId: string;
    username: string;
    image: string;
    email: string;
    createdAt: DateTime;
}

export interface Comment {
    text: string;
    user: User;
    createdAt: DateTime;
}

export interface ErrorTypeDelete {
    path: string;
    message: string;
}

export interface DeleteResponse {
    error?: Nullable<ErrorTypeDelete[]>;
}

export interface Post {
    id: string;
    body: string;
    countLikes: number;
    createdAt: string;
    user: User;
    likes?: Nullable<User[]>;
    comments?: Nullable<Comment[]>;
}

export interface ErrorTypeCreatePost {
    path: string;
    message: string;
}

export interface ErrorTypeLikePost {
    path: string;
    message: string;
}

export interface ErrorType {
    path: string;
    message: string;
}

export interface RegisterResponse {
    error?: Nullable<ErrorType[]>;
}

export interface IQuery {
    whoami(whoamiInput: WhoamiInput): User | Promise<User>;
    posts(): Post[] | Promise<Post[]>;
}

export interface IMutation {
    deleteUser(deleteInput: DeleteInput): DeleteResponse | Promise<DeleteResponse>;
    createPost(createPostInput: CreatePostInput): Post | Promise<Post>;
    likePost(likePostInput: LikePostInput): Post | Promise<Post>;
    addComment(addCommentInput: AddCommentInput): Post | Promise<Post>;
    register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;
}

export interface ISubscription {
    commentAdded(postId: string): Post | Promise<Post>;
}

export type DateTime = any;
type Nullable<T> = T | null;

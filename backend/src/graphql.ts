
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface DeleteInput {
    id: string;
}

export interface CreatePostInput {
    body: string;
    clerkUserId: string;
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
    createdAt: string;
}

export interface ErrorTypeCreatePost {
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
    whoami(): User | Promise<User>;
    posts(): Post[] | Promise<Post[]>;
}

export interface IMutation {
    deleteUser(deleteInput: DeleteInput): DeleteResponse | Promise<DeleteResponse>;
    createPost(createPostInput: CreatePostInput): Post | Promise<Post>;
    register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;
}

export type DateTime = any;
type Nullable<T> = T | null;

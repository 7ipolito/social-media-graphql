
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface RegisterInput {
    clerkUserId: string;
    email: string;
}

export interface ErrorType {
    path: string;
    message: string;
}

export interface RegisterResponse {
    error?: Nullable<ErrorType[]>;
}

export interface UsersResponse {
    error?: Nullable<ErrorType[]>;
    userId?: Nullable<string>;
}

export interface Post {
    id: string;
    body: string;
    username: string;
    createdAt: string;
}

export interface IQuery {
    whoami(): UsersResponse | Promise<UsersResponse>;
    posts(): Post[] | Promise<Post[]>;
}

export interface IMutation {
    register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;
}

type Nullable<T> = T | null;

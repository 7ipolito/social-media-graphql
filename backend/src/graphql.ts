
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

export interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: DateTime;
}

export interface Post {
    id: string;
    body: string;
    username: string;
    createdAt: string;
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
    register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;
}

export type DateTime = any;
type Nullable<T> = T | null;

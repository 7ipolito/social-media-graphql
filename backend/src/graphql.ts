
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginInput {
    username: string;
    password: string;
}

export interface RegisterInput {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: DateTime;
    token: string;
}

export interface LoginResponse {
    user: User;
}

export interface RegisterResponse {
    user: User;
}

export interface Post {
    id: string;
    body: string;
    username: string;
    createdAt: string;
}

export interface IQuery {
    posts(): Post[] | Promise<Post[]>;
}

export interface IMutation {
    login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;
    register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;
}

export type DateTime = any;
type Nullable<T> = T | null;

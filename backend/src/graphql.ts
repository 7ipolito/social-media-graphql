
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

export interface LoginResponse {
    error?: Nullable<ErrorType[]>;
}

export interface IQuery {
    posts(): Post[] | Promise<Post[]>;
}

export interface IMutation {
    login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;
    register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;
}

type Nullable<T> = T | null;

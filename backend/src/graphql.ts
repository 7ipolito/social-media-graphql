
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    id: string;
    name: string;
}

export interface Post {
    id: string;
    body: string;
    username: string;
    createdAt: string;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    posts(): Post[] | Promise<Post[]>;
}

type Nullable<T> = T | null;

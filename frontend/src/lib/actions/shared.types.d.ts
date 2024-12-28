export interface CreateUserParams {
  clerkUserId: string;
  email: string;
  username: string | null;
  image: string;
}

export interface DeleteUserParams {
  clerkUserId: string;
}

export interface GetUserParams {
  _id: string;
  clerkUserId: string;
  email: string;
  username: string | null;
  image: string;
  createAt: Date;
}

interface Likes {
  _id: string;
  email: string;
  clerkUserId: string;
}

interface User {
  _id: string;
  email: string;
  image: string;
  clerkUserId: string;
  username: string;
}

export interface GetPostParams {
  id: string;
  countLikes: number;
  likes: Likes[];
  user: User;
  body: string;
  createdAt: Date;
}

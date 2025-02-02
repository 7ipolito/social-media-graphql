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
  countComments: number;
  likes: User[];
  user: User;
  body: string;
  createdAt: Date;
}

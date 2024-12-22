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
  clerkUserId: string;
  email: string;
  username: string | null;
  image: string;
  createAt: Date;
}

export interface GetPostParams {
  body: string;
}

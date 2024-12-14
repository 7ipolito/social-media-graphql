export interface CreateUserParams {
  clerkId: string;
  email: string;
  username: string | null;
  image: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetUserParams {
  clerkId: string;
  email: string;
  username: string | null;
  image: string;
  createAt: Date;
}

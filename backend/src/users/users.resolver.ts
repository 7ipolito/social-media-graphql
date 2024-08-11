import { Query, Resolver } from '@nestjs/graphql';
import { User } from './users.schema';

export interface UserModel {
  id: number;
  name: string;
}

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User], { name: 'users' }) //name set instead of getAllBooks it's now books
  getAllBooks() {
    const arr: UserModel[] = [
      {
        id: 1,
        name: 'Allan',
      },
    ];
    return arr;
  }
}

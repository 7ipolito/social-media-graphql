import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users: any = [{ id: 1, name: 'Cat' }];

  findAll(): [] {
    return this.users;
  }
}

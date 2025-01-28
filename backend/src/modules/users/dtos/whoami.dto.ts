import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class WhoamiInput {
  @Field()
  userId: string;
}

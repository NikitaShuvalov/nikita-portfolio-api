import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => Int)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  startDate: string;

  @Field(() => String, { nullable: true })
  endDate?: string | null;

  @Field()
  achievements: string;
}
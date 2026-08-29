import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Project } from './project.model';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  github?: string | null;

  @Field(() => [Skill], { nullable: true })
  skills?: Skill[];

  @Field(() => [Experience], { nullable: true })
  experience?: Experience[];

  @Field(() => [Project], { nullable: true })
  projects?: Project[];
}
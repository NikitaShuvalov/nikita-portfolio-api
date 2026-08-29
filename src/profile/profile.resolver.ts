import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './models/profile.model';
import { Skill } from './models/skill.model';
import { Experience } from './models/experience.model';
import { Project } from './models/project.model';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { name: 'profile', description: 'Get the full profile with nested data' })
  async getProfile(): Promise<Profile> {
    return this.profileService.getProfile();
  }

  @Query(() => [Skill], { name: 'skills' })
  async getSkills(): Promise<Skill[]> {
    return this.profileService.getSkills();
  }

  @Query(() => [Experience], { name: 'experience' })
  async getExperience(): Promise<Experience[]> {
    return this.profileService.getExperience();
  }

  @Query(() => [Project], { name: 'projects' })
  async getProjects(): Promise<Project[]> {
    return this.profileService.getProjects();
  }

  @ResolveField(() => [Skill])
  async skills(@Parent() profile: Profile): Promise<Skill[]> {
    if (profile.skills) {
      return profile.skills;
    }
    return this.profileService.getSkills();
  }

  @ResolveField(() => [Experience])
  async experience(@Parent() profile: Profile): Promise<Experience[]> {
    if (profile.experience) {
      return profile.experience;
    }
    return this.profileService.getExperience();
  }

  @ResolveField(() => [Project])
  async projects(@Parent() profile: Profile): Promise<Project[]> {
    if (profile.projects) {
      return profile.projects;
    }
    return this.profileService.getProjects();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<Profile> {
    const profile = await this.prisma.profile.findFirst({
      include: {
        skills: {
          orderBy: { name: 'asc' },
        },
        experience: {
          orderBy: { startDate: 'desc' },
        },
        projects: {
          orderBy: { name: 'asc' },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found. Did you run the seed?');
    }

    return profile;
  }

  async getSkills() {
    const profile = await this.getProfile();
    return profile.skills ?? [];
  }

  async getExperience() {
    const profile = await this.getProfile();
    return profile.experience ?? [];
  }

  async getProjects() {
    const profile = await this.getProfile();
    return profile.projects ?? [];
  }
}

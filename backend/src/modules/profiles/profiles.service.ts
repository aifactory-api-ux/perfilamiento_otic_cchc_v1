import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileEntity } from "./profiles.entity";
import { SkillsService } from "../skills/skills.service";

interface CreateProfileInput {
  firstName: string;
  lastName: string;
  email: string;
  title?: string;
  bio?: string;
  skillIds?: string[];
}

interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  title?: string;
  bio?: string;
  skillIds?: string[];
}

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profilesRepository: Repository<ProfileEntity>,
    private readonly skillsService: SkillsService
  ) {}

  async findAll() {
    return this.profilesRepository.find({ order: { createdAt: "DESC" } });
  }

  async findOne(id: string) {
    const profile = await this.profilesRepository.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException("Profile not found");
    }
    return profile;
  }

  async create(input: CreateProfileInput) {
    const existing = await this.profilesRepository.findOne({ where: { email: input.email } });
    if (existing) {
      throw new ConflictException("Profile email already exists");
    }

    const profile = this.profilesRepository.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      title: input.title || null,
      bio: input.bio || null
    });

    if (input.skillIds && input.skillIds.length) {
      profile.skills = await this.skillsService.resolveSkillsByIds(input.skillIds);
    }

    return this.profilesRepository.save(profile);
  }

  async update(id: string, input: UpdateProfileInput) {
    const profile = await this.findOne(id);

    if (input.email && input.email !== profile.email) {
      const existing = await this.profilesRepository.findOne({ where: { email: input.email } });
      if (existing) {
        throw new ConflictException("Profile email already exists");
      }
    }

    profile.firstName = input.firstName ?? profile.firstName;
    profile.lastName = input.lastName ?? profile.lastName;
    profile.email = input.email ?? profile.email;
    profile.title = input.title ?? profile.title;
    profile.bio = input.bio ?? profile.bio;

    if (input.skillIds) {
      profile.skills = await this.skillsService.resolveSkillsByIds(input.skillIds);
    }

    return this.profilesRepository.save(profile);
  }

  async remove(id: string) {
    const profile = await this.findOne(id);
    await this.profilesRepository.remove(profile);
    return { deleted: true };
  }
}

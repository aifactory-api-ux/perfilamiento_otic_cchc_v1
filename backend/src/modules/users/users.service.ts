import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./users.entity";
import { KeycloakProfile } from "../auth/auth.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async upsertFromKeycloak(profile: KeycloakProfile) {
    const existing = await this.usersRepository.findOne({
      where: { keycloakId: profile.subject }
    });

    if (existing) {
      existing.email = profile.email;
      existing.name = profile.name;
      existing.givenName = profile.givenName || null;
      existing.familyName = profile.familyName || null;
      return this.usersRepository.save(existing);
    }

    const created = this.usersRepository.create({
      keycloakId: profile.subject,
      email: profile.email,
      name: profile.name,
      givenName: profile.givenName || null,
      familyName: profile.familyName || null
    });

    return this.usersRepository.save(created);
  }
}

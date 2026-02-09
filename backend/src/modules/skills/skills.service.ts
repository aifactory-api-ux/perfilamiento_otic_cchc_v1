import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SkillEntity } from "./skills.entity";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillsRepository: Repository<SkillEntity>
  ) {}

  async findAll() {
    return this.skillsRepository.find({ order: { name: "ASC" } });
  }

  async resolveSkillsByIds(ids: string[]) {
    if (!ids.length) {
      return [];
    }
    const skills = await this.skillsRepository.find({ where: { id: In(ids) } });
    if (skills.length != ids.length) {
      throw new NotFoundException("One or more skills not found");
    }
    return skills;
  }

  async createIfMissing(names: string[]) {
    const cleaned = names.map((name) => name.trim()).filter((name) => name.length > 0);
    if (!cleaned.length) {
      return [];
    }
    const existing = await this.skillsRepository.find({ where: cleaned.map((name) => ({ name })) });
    const existingNames = new Set(existing.map((skill) => skill.name));
    const toCreate = cleaned.filter((name) => !existingNames.has(name));
    const created = toCreate.length ? await this.skillsRepository.save(toCreate.map((name) => ({ name }))) : [];
    return [...existing, ...created];
  }
}

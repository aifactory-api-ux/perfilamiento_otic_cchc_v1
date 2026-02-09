import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfilesController } from "./profiles.controller";
import { ProfilesService } from "./profiles.service";
import { ProfileEntity } from "./profiles.entity";
import { SkillsModule } from "../skills/skills.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity]), SkillsModule],
  controllers: [ProfilesController],
  providers: [ProfilesService]
})
export class ProfilesModule {}

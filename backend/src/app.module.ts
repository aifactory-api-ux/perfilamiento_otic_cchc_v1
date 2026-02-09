import { Module } from "@nestjs/common";
import { DatabaseModule } from "./shared/database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ProfilesModule } from "./modules/profiles/profiles.module";
import { SkillsModule } from "./modules/skills/skills.module";

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, ProfilesModule, SkillsModule]
})
export class AppModule {}

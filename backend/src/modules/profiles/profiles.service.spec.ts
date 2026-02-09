import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfilesService } from "./profiles.service";
import { ProfileEntity } from "./profiles.entity";
import { SkillsModule } from "../skills/skills.module";
import { SkillEntity } from "../skills/skills.entity";

describe("ProfilesService", () => {
  let service: ProfilesService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          dropSchema: true,
          entities: [ProfileEntity, SkillEntity],
          synchronize: true
        }),
        TypeOrmModule.forFeature([ProfileEntity, SkillEntity]),
        SkillsModule
      ],
      providers: [ProfilesService]
    }).compile();

    service = moduleRef.get(ProfilesService);
  });

  it("creates a profile", async () => {
    const created = await service.create({
      firstName: "Ana",
      lastName: "Diaz",
      email: "ana@example.com"
    });

    expect(created.id).toBeDefined();
    expect(created.email).toBe("ana@example.com");
  });
});

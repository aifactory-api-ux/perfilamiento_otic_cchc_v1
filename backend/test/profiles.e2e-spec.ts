import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfilesModule } from "../src/modules/profiles/profiles.module";
import { SkillsModule } from "../src/modules/skills/skills.module";
import { ProfileEntity } from "../src/modules/profiles/profiles.entity";
import { SkillEntity } from "../src/modules/skills/skills.entity";

describe("ProfilesController (e2e)", () => {
  let app: INestApplication;

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
        SkillsModule,
        ProfilesModule
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("creates and lists profiles", async () => {
    const payload = {
      firstName: "Maria",
      lastName: "Lopez",
      email: "maria@example.com"
    };

    await request(app.getHttpServer())
      .post("/profiles")
      .send(payload)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get("/profiles")
      .expect(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0].email).toBe("maria@example.com");
  });
});

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../src/modules/auth/auth.module";
import { UsersModule } from "../src/modules/users/users.module";
import { UserEntity } from "../src/modules/users/users.entity";
import { KeycloakGuard } from "../src/modules/auth/guards/keycloak.guard";

describe("AuthController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          dropSchema: true,
          entities: [UserEntity],
          synchronize: true
        }),
        UsersModule,
        AuthModule
      ]
    })
      .overrideGuard(KeycloakGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.user = { sub: "kc-1", email: "test@example.com", name: "Test User" };
          return true;
        }
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("responds to health", async () => {
    await request(app.getHttpServer())
      .get("/auth/health")
      .expect(200)
      .expect({ status: "ok" });
  });

  it("returns current user", async () => {
    const response = await request(app.getHttpServer())
      .get("/auth/me")
      .expect(200);

    expect(response.body.email).toBe("test@example.com");
  });
});

import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { UserEntity } from "../users/users.entity";

describe("AuthService", () => {
  let service: AuthService;

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
        UsersModule
      ],
      providers: [AuthService]
    }).compile();

    service = moduleRef.get(AuthService);
  });

  it("parses a valid token payload", () => {
    const profile = service.getProfileFromToken({
      sub: "kc-2",
      email: "user@example.com",
      name: "User Example"
    });

    expect(profile.email).toBe("user@example.com");
  });
});

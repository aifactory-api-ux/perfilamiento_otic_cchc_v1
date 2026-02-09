import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as jwksRsa from "jwks-rsa";

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, "keycloak") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.KEYCLOAK_AUDIENCE,
      issuer: process.env.KEYCLOAK_ISSUER_URL,
      algorithms: ["RS256"],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri: process.env.KEYCLOAK_JWKS_URI || "",
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10
      })
    });
  }

  async validate(payload: Record<string, unknown>) {
    return payload;
  }
}

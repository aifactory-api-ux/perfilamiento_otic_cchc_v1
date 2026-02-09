import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";

export interface KeycloakProfile {
  subject: string;
  email: string;
  name: string;
  givenName?: string;
  familyName?: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  getProfileFromToken(payload: Record<string, unknown>): KeycloakProfile {
    const subject = String(payload.sub || "");
    const email = String(payload.email || "");
    const name = String(payload.name || payload.preferred_username || "");

    if (!subject || !email) {
      throw new UnauthorizedException("Token missing required claims");
    }

    return {
      subject,
      email,
      name,
      givenName: payload.given_name ? String(payload.given_name) : undefined,
      familyName: payload.family_name ? String(payload.family_name) : undefined
    };
  }

  async syncUser(profile: KeycloakProfile) {
    await this.usersService.upsertFromKeycloak(profile);
  }
}

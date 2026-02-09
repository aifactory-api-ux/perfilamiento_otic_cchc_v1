import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { KeycloakGuard } from "./guards/keycloak.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("health")
  health() {
    return { status: "ok" };
  }

  @UseGuards(KeycloakGuard)
  @Get("me")
  async me(@Req() req: Request) {
    const user = this.authService.getProfileFromToken(req.user as Record<string, unknown>);
    await this.authService.syncUser(user);
    return user;
  }
}

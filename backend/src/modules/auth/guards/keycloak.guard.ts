import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class KeycloakGuard extends AuthGuard("keycloak") {
  handleRequest(err: unknown, user: unknown, _info: unknown, _context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException("Unauthorized");
    }
    return user;
  }
}

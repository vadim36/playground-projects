import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";
import { JwtService } from "@nestjs/jwt";
import UserModel from "src/users/user.model";
import RoleModel from "src/roles/role.model";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ])

      if (!requiredRoles) return true

      const request = context.switchToHttp().getRequest()
      const authHeader: string = request.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Such user does not exist')
      }

      const user: UserModel = this.jwtService.verify(token)
      request.user = user
      return user.roles.some((role: RoleModel) => requiredRoles.includes(role.value))
    } catch (error: unknown) {
      console.log(error as Error)
      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    }
  }
}
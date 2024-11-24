import { SetMetadata } from "@nestjs/common"

export const ROLES_KEY: string = 'Roles'

export function Roles(...roles: string[]) {
  return SetMetadata(ROLES_KEY, roles)
}
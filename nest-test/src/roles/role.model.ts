import { $Enums, Role } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import UserRoleModel from "src/users/user.model";

export default class RoleModel implements Role {
  @ApiProperty({description: 'Identifier', example: 'uuid'})
  roleId: string;
  @ApiProperty({description: 'Role', example: $Enums.Roles.Base})
  value: $Enums.Roles;
  @ApiProperty({description: 'Users with this role', example: 'Average user'})
  users?: UserRoleModel[]
}
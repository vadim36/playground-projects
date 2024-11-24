import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export default class CreateRoleDto {
  @ApiProperty({example: $Enums.Roles.Base, description: 'Role'})
  value: $Enums.Roles
}
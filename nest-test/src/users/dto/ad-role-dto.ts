import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export default class AddRoleDto {
  @ApiProperty({description: 'Role for user', example: $Enums.Roles.Admin})
  readonly value: $Enums.Roles
  @ApiProperty({description: 'The user`s identifier', example: 'test@gmail.com'})
  readonly email: string
}
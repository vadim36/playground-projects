import { ApiProperty } from "@nestjs/swagger";
import { $Enums, User } from "@prisma/client";
import RoleModel from "src/roles/role.model";

export default class UserModel implements User {
  @ApiProperty({description: 'Identifier', example: 'uuid'})
  userId: string;
  @ApiProperty({description: 'Email', example: 'test@gmail.com'})
  email: string;
  @ApiProperty({description: 'Password', example: 'Password'})
  password: string;
  @ApiProperty({description: 'is banned', example: false})
  banned: boolean;
  @ApiProperty({description: 'Ban reason', example: 'For insults'})
  banReason: string;
  @ApiProperty({description: 'User`s role', example: [$Enums.Roles.Base]})
  roles?: RoleModel[]
}
import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsString, Length} from 'class-validator'

export default class CreateUserDto {
  @ApiProperty({description: 'Email', example: 'test@gmail.com'})
  @IsString({message: 'Email must be a string'})
  @IsEmail({}, {message: 'Email is not correct'})
  email: string
  @ApiProperty({description: 'Password', example: 'Password'})
  @IsString({message: 'Password must be a string'})
  @Length(4, 24, {message: 'Password must be more than 4 and less than 24'})
  password: string
}
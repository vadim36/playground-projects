import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateUserDto from 'src/users/dto/create-user-dto';
import { AuthService, Token } from './auth.service';

@ApiTags('Authtorization')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}
  
  @ApiOperation({summary: 'Registration a new user'})
  @ApiResponse({status: 201, type: Token})
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto):Promise<Token> {
    return await this.authService.registration(userDto)
  }

  @ApiOperation({summary: 'Login'})
  @ApiResponse({status: 201, type: Token})
  @Post('/login')
  async login(@Body() userDto: CreateUserDto):Promise<Token> {
    return await this.authService.login(userDto)
  }
}
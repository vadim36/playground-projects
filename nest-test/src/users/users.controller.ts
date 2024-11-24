import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import CreateUserDto from './dto/create-user-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserModel from './user.model';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import AddRoleDto from './dto/ad-role-dto';
import BanUserDto from './dto/ban-user-dto';
import ValidationPipe from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor (private usersService: UsersService) {}

  @ApiOperation({summary: 'Creation user'})
  @ApiResponse({status: 201, type: UserModel})
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() userDto: CreateUserDto):Promise<UserModel> {
    return await this.usersService.createUser(userDto)
  }

  @ApiOperation({summary: 'Getting all the users'})
  @ApiResponse({status: 200, type: [UserModel]})
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get()
  async getUsers():Promise<UserModel[]> {
    return await this.usersService.getUsers()
  }

  @ApiOperation({summary: 'Get user by email'})
  @ApiResponse({status: 200, type: UserModel})
  @Get('/:email')
  async getUserByEmail(@Param() email: string):Promise<UserModel> {
    return await this.usersService.getUserByEmail(email)
  }

  @ApiOperation({summary: 'Add user a role'})
  @ApiResponse({status: 201, type: UserModel})
  @Post('/role')
  async addRole(@Body() roleDto: AddRoleDto) {
    return await this.usersService.addRole(roleDto)
  }

  @ApiOperation({summary: 'Ban a user'})
  @ApiResponse({status: 201})
  @Post('/ban')
  async ban(@Body() banDto: BanUserDto) {
    return await this.usersService.ban(banDto)
  }
}
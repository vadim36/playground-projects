import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import PrismaService from 'src/db/prisma.service';
import CreateUserDto from './dto/create-user-dto';
import UserModel from './user.model';
import { RolesService } from 'src/roles/roles.service';
import AddRoleDto from './dto/ad-role-dto';
import BanUserDto from './dto/ban-user-dto';

@Injectable()
export class UsersService {
  constructor (
    private prismaService: PrismaService,
    private roleService: RolesService
  ) {}

  async createUser(userDto: CreateUserDto):Promise<UserModel> {
    const baseRole = await this.roleService.getRoleByValue('Base')
    return await this.prismaService.user.create({
      data: {...userDto, roles: { connect: { roleId: baseRole.roleId }}},
      include: {roles: true}
    })
  }

  async getUsers():Promise<UserModel[]> {
    return await this.prismaService.user.findMany({
      include: {roles: true}
    })
  }

  async getUserByEmail(email: string):Promise<UserModel> {
    return await this.prismaService.user.findUnique({
      where: {email},
      include: {roles: true}
    })
  }

  async addRole(roleDto: AddRoleDto):Promise<UserModel> {
    const user = await this.getUserByEmail(roleDto.email)
    const role = await this.roleService.getRoleByValue(roleDto.value)

    if (!user || !role) {
      throw new HttpException('User or role were not founded', HttpStatus.NOT_FOUND)
    }

    return await this.prismaService.user.update({
      where: {email: user.email},
      data: {roles: { connect: { roleId: role.roleId }}},
      include: {roles: true}
    })
  }

  async ban(banDto: BanUserDto):Promise<UserModel> {
    const user = await this.prismaService.user.update({
      where: {email: banDto.email},
      data: {
        banReason: banDto.banReason,
        banned: true
      }
    })

    if (!user) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND)
    } 

    return user
  }
}
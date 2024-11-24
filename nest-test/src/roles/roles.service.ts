import { Injectable } from '@nestjs/common';
import PrismaService from 'src/db/prisma.service';
import CreateRoleDto from './dto/create-role-dto';
import RoleModel from './role.model';
import { $Enums } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor (private prismaService: PrismaService) {}
  
  async createRole(roleDto: CreateRoleDto):Promise<RoleModel> {
    return await this.prismaService.role.create({
      data: {...roleDto},
      include: {users: true}
    })
  }

  async getRoleByValue(value: $Enums.Roles):Promise<RoleModel> {
    return await this.prismaService.role.findUnique({
      where: {value}
    })
  }
}
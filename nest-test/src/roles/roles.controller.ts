import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import RoleModel from './role.model';
import { RolesService } from './roles.service';
import CreateRoleDto from './dto/create-role-dto';
import { $Enums } from '@prisma/client';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor (private roleService: RolesService) {}

  @ApiOperation({summary: 'Creation role'})
  @ApiResponse({status: 201, type: RoleModel})
  @Post()
  async createRole(@Body() roleDto: CreateRoleDto):Promise<RoleModel> {
    return await this.roleService.createRole(roleDto)
  }

  @ApiOperation({summary: 'Getting role by its value'})
  @ApiResponse({status: 200, type: RoleModel})
  @Get('/:value')
  async getRoleByValue(@Param('value') value: $Enums.Roles):Promise<RoleModel> {
    return await this.roleService.getRoleByValue(value)
  }
}
import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import PrismaService from 'src/db/prisma.service';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [
    RolesModule, 
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import PrismaService from "./db/prisma.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'

@Module({
  providers: [PrismaService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static')
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export default class AppModule {}
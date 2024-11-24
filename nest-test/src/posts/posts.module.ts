import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import PrismaService from 'src/db/prisma.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
  imports: [FilesModule]
})
export class PostsModule {}

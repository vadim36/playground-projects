import { Injectable } from '@nestjs/common';
import CreatePostDto from './dto/create-post-dto';
import PostModel from './posts.model';
import PrismaService from 'src/db/prisma.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
  constructor (
    private prismaService: PrismaService,
    private fileService: FilesService
  ) {}

  async createPost(postDto: CreatePostDto, image: any):Promise<PostModel> {
    const fileName = await this.fileService.createFile(image)
    return await this.prismaService.post.create({
      data: {
        title: postDto.title,
        content: postDto.content, 
        author: { connect: {email: postDto.authorEmail}}, 
        image: fileName
      },
      include: { author: true}
    })
  } 
}
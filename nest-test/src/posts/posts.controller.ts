import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import CreatePostDto from './dto/create-post-dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PostModel from './posts.model';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor (private postsService: PostsService) {}

  @Post()
  @ApiOperation({summary: 'Create a post'})
  @ApiResponse({status: 201, type: PostModel})
  @UseInterceptors(FileInterceptor('image'))
  async createPost(@Body() postDto: CreatePostDto, @UploadedFile() image):Promise<PostModel> {
    return this.postsService.createPost(postDto, image)
  }
}
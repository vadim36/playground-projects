import { ApiProperty } from "@nestjs/swagger";
import PostModel from "../posts.model";

export default class CreatePostDto implements Partial<PostModel> {
  @ApiProperty({description: 'Post title', example: 'How to write a server'})
  title: string;
  @ApiProperty({description: 'Post content', example: 'text...'})
  content: string;
  @ApiProperty({description: 'Unique email of user', example: 'test@gmail.com'})
  authorEmail: string;
}
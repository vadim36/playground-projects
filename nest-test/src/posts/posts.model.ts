import { ApiProperty } from '@nestjs/swagger';
import type {Post} from '@prisma/client'
import UserModel from 'src/users/user.model';

export default class PostModel implements Post {
  @ApiProperty({description: 'Post id', example: 'uuid'})
  postId: string;
  @ApiProperty({description: 'Post title', example: 'How to write a server'})
  title: string;
  @ApiProperty({description: 'Post content', example: 'text...'})
  content: string;
  @ApiProperty({description: 'Post image', example: 'test.jpg'})
  image: string;
  @ApiProperty({description: 'Author unique email', example: 'test@gmail.com'})
  authorEmail: string;
  author: UserModel
}
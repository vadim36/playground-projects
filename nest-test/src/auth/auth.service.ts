import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create-user-dto';
import * as bcrypt from 'bcryptjs'
import UserModel from 'src/users/user.model';
import UserPayload from './user-payload';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

export class Token {
  token: string
}

@Injectable()
export class AuthService {
  constructor (
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async registration(userDto: CreateUserDto):Promise<Token> {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException('Such user already exist', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 4)
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    return this.generateTokens(user)
  }

  async login(userDto: CreateUserDto):Promise<Token> {
    const user = await this.userService.getUserByEmail(userDto.email)
    if (!user) {
      throw new HttpException('Such user does not exist', HttpStatus.BAD_REQUEST)
    }
    return this.generateTokens(user)
  }

  private generateTokens(userModel: UserModel):Token {
    const payload = new UserPayload(userModel)
    const token = this.jwtService.sign({...payload})
    return { token }
  }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email tidak terdaftar'); 
    }

    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = { 
      sub: user.id,
      username: user.username, 
      role: user.role?.roleName
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: any) {
    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        roleId: 1,
      },
    });
  }
}
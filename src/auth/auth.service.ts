import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new Error('Email tidak terdaftar');
    }

    if (user.password !== loginDto.password) {
      throw new Error('Password salah');
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
}
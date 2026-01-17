import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Mana Token-nya? Kamu dilarang masuk!');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'RAHASIA_NEGARA_JANGAN_DISEBAR',
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token Palsu atau Sudah Kadaluwarsa!');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
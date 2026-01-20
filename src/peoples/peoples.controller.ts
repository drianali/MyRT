import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PeoplesService } from './peoples.service'; 
import { AuthGuard } from 'src/auth/auth.guard'; 

@Controller('people') 
export class PeoplesController {
  constructor(private readonly peoplesService: PeoplesService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async findMyProfile(@Request() req) {
    console.log('🔍 User Requesting Profile:', req.user);

    const userId = req.user.sub || req.user.userId || req.user.id;
    
    return this.peoplesService.findMyProfile(userId);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async updateProfile(@Request() req, @Body() data: any) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.peoplesService.upsertProfile(userId, data);
  }
}
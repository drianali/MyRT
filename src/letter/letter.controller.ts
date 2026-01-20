import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { LetterService } from './letter.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('letters') 
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() data: any) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.letterService.create(userId, data);
  }

  @UseGuards(AuthGuard)
  @Get('mine')
  findMyLetters(@Request() req) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.letterService.findMyLetters(userId);
  }

  @UseGuards(AuthGuard)
  @Get() 
  findAllAdmin() {
    return this.letterService.findAllAdmin();
  }

  @UseGuards(AuthGuard)
  @Patch(':id') 
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.letterService.updateStatus(+id, status);
  }
}
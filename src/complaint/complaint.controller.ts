import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ComplaintsService } from './complaint.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: any, @Request() req) {
    const userId = req.user.sub || req.user.id;
    
    return this.complaintsService.create(+userId, data);
  }

  @Get()
  findAll() {
    return this.complaintsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('mine')
  findMine(@Request() req) {
    const userId = req.user.sub || req.user.id;
    return this.complaintsService.findMine(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.complaintsService.update(+id, data);
  }
}
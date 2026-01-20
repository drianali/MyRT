import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common'; // Tambah Request
import { AnnouncementsService } from './announcements.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: any, @Request() req) {
    const userId = req.user.sub || req.user.id; 

    return this.announcementsService.create({
      ...data,
      adminId: Number(userId)
    });
  }

  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(+id);
  }
}
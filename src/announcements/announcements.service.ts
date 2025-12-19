import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementsService {
   constructor(private prisma: PrismaService) {}
        
        create(data: CreateAnnouncementDto) {
            return this.prisma.announcement.create({ data });
          }
        
          findAll() {
            return this.prisma.announcement.findMany();
          }
        
          findOne(id: number) {
            return this.prisma.announcement.findUnique({ where: { id } });
          }
        
          update(id: number, data: UpdateAnnouncementDto) {
            return this.prisma.announcement.update({ where: { id }, data });
          }
        
          remove(id: number) {
            return this.prisma.announcement.delete({ where: { id } });
          }
}

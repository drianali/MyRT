import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.announcement.create({
      data: {
        title: data.title,
        content: data.content,
        admin: {
            connect: { id: data.adminId }
        }
      }
    });
  }

  findAll() {
    return this.prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
      include: { admin: true }
    });
  }

  remove(id: number) {
    return this.prisma.announcement.delete({ where: { id } });
  }
}
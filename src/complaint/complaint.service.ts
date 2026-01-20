import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: any) {
    const warga = await this.prisma.people.findFirst({
      where: { userId: userId },
    });

    if (!warga) {
      throw new NotFoundException("Data warga tidak ditemukan untuk akun ini. Hubungi Admin.");
    }

    return this.prisma.complaint.create({
      data: {
        titleReport: data.title,      
        description: data.description,
        category: "Umum",             
        status: "PENDING",
        peopleId: warga.id           
      },
    });
  }

  findAll() {
    return this.prisma.complaint.findMany({
      orderBy: { createdAt: 'desc' },
      include: { people: true } 
    });
  }

  async findMine(userId: number) {
    const warga = await this.prisma.people.findFirst({
        where: { userId: userId },
    });
    
    if(!warga) return []; 

    return this.prisma.complaint.findMany({
      where: { peopleId: warga.id }, 
      orderBy: { createdAt: 'desc' }
    });
  }

  update(id: number, data: any) {
    return this.prisma.complaint.update({
      where: { id },
      data: { status: data.status }
    });
  }
}
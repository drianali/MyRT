import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeoplesService {
  constructor(private prisma: PrismaService) {}

  async findMyProfile(userId: number) {
    return this.prisma.people.findUnique({
      where: { userId: Number(userId) },
    });
  }

  async upsertProfile(userId: number, data: any) {
    return this.prisma.people.upsert({
      where: { userId: Number(userId) },
      update: {
        nik: data.nik,
        name: data.name,
        address: data.address,
        residentStatus: data.residentStatus,
        numberFamilyMembers: data.numberFamilyMembers,
      },
      create: {
        userId: Number(userId),
        nik: data.nik,
        name: data.name,
        address: data.address,
        residentStatus: data.residentStatus || 'Tetap',
        numberFamilyMembers: data.numberFamilyMembers || '1',
      },
    });
  }
}
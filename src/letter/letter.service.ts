import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LetterService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: any) {
    const people = await this.prisma.people.findUnique({
      where: { userId: Number(userId) },
    });

    if (!people) {
      throw new NotFoundException('Data warga tidak ditemukan. Harap lengkapi Profil dulu.');
    }

    return this.prisma.letter.create({
      data: {
        letterType: data.letterType,
        needs: data.needs,
        status: 'Diajukan', 
        peopleId: people.id,
      },
    });
  }

  async findMyLetters(userId: number) {
    return this.prisma.letter.findMany({
      where: {
        people: { userId: Number(userId) },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllAdmin() {
  return this.prisma.letter.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      people: true 
    }
  });
}

  async updateStatus(id: number, status: string) {
    return this.prisma.letter.update({
      where: { id },
      data: { status },
    });
  }
}
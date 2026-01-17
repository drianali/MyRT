import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLetterDto } from './dto/create-letter.dto';
import { UpdateLetterDto } from './dto/update-letter.dto';

@Injectable()
export class LetterService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLetterDto) {
    return this.prisma.letter.create({ data });
  }

  findAll() {
    return this.prisma.letter.findMany({
      include: {
        people: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.letter.findUnique({
      where: { id },
      include: {
        people: true,
      },
    });
  }

  update(id: number, data: UpdateLetterDto) {
    return this.prisma.letter.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.letter.delete({ where: { id } });
  }
}

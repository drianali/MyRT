import { Injectable } from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePeopleDto } from './dto/update-people.dto';

@Injectable()
export class PeoplesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePeopleDto) {
    return this.prisma.people.create({ data });
  }

  findAll() {
    return this.prisma.people.findMany({
      include: {
        user: true,
        letters: true,
        complaints: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.people.findUnique({
      where: { id },
      include: {
        user: true,
        letters: true,
        complaints: true,
      },
    });
  }

  update(id: number, data: UpdatePeopleDto) {
    return this.prisma.people.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.people.delete({ where: { id } });
  }
}

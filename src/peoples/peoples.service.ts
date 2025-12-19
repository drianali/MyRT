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
      return this.prisma.people.findMany();
    }
  
    findOne(id: number) {
      return this.prisma.people.findUnique({ where: { id } });
    }
  
    update(id: number, data: UpdatePeopleDto) {
      return this.prisma.people.update({ where: { id }, data });
    }
  
    remove(id: number) {
      return this.prisma.people.delete({ where: { id } });
    }
  }

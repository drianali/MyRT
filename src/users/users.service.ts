import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: data,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        const target = error.meta?.target;

        if (target.includes('email')) {
            throw new ConflictException('Email ini sudah terdaftar! Gunakan email lain.');
        }
        
        if (target.includes('phoneNumber')) {
            throw new ConflictException('Nomor HP ini sudah terdaftar! Cek data warga lain.');
        }

        throw new ConflictException('Data sudah ada (Duplikat).');
      }

      throw error;
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        role: true,
        people: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        people: true,
        announcements: true,
      },
    });
  }

  update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true
      }
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
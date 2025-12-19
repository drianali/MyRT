import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
      
      create(data: CreateRoleDto) {
          return this.prisma.role.create({ data });
        }
      
        findAll() {
          return this.prisma.role.findMany();
        }
      
        findOne(id: number) {
          return this.prisma.role.findUnique({ where: { id } });
        }
      
        update(id: number, data: UpdateRoleDto) {
          return this.prisma.role.update({ where: { id }, data });
        }
      
        remove(id: number) {
          return this.prisma.role.delete({ where: { id } });
        }
}

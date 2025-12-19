import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

@Injectable()
export class ComplaintService {
  constructor(private prisma: PrismaService) {}
      
      create(data: CreateComplaintDto) {
          return this.prisma.complaint.create({ data });
        }
      
        findAll() {
          return this.prisma.complaint.findMany();
        }
      
        findOne(id: number) {
          return this.prisma.complaint.findUnique({ where: { id } });
        }
      
        update(id: number, data: UpdateComplaintDto) {
          return this.prisma.complaint.update({ where: { id }, data });
        }
      
        remove(id: number) {
          return this.prisma.complaint.delete({ where: { id } });
        }
}

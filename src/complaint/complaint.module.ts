import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaint.service';
import { ComplaintsController } from './complaint.controller';

@Module({
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintModule {}
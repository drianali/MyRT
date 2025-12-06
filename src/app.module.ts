import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LetterModule } from './letter/letter.module';
import { ComplaintModule } from './complaint/complaint.module';

@Module({
  imports: [UsersModule, PrismaModule, LetterModule, ComplaintModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
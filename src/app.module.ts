import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LetterModule } from './letter/letter.module';
import { ComplaintModule } from './complaint/complaint.module';

@Module({
  imports: [UsersModule, PrismaModule, LetterModule, ComplaintModule],
import { PeoplesModule } from './peoples/peoples.module';
import { RolesModule } from './roles/roles.module';
import { AnnouncementModule } from './announcement/announcement.module';

@Module({
  imports: [UsersModule, PrismaModule, PeoplesModule, RolesModule, AnnouncementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LetterModule } from './letter/letter.module';
import { ComplaintModule } from './complaint/complaint.module';
import { PeoplesModule } from './peoples/peoples.module';
import { RolesModule } from './roles/roles.module';
import { AnnouncementsModule } from './announcements/announcements.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PeoplesModule,
    RolesModule,
    LetterModule,
    ComplaintModule,
    AnnouncementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
    PrismaModule,
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule { }

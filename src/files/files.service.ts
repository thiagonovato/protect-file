import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  create(createFileDto: CreateFileDto) {
    return this.prisma.files.create({ data: createFileDto });
  }

  async findAll() {
    const list = await this.prisma.files.findMany();

    const newList = list.map((item) => {
      return {
        ...item,
        token: this.jwtService.sign({
          hash: item.hash,
          expiresIn: new Date().setMinutes(new Date().getMinutes() + 10),
        }),
      };
    });

    return newList;
  }

  async findOne(token: string) {
    const obj: any = this.jwtService.decode(token);

    const dateToken = new Date(obj.expiresIn).getTime();
    if (dateToken < new Date().getTime()) {
      throw new ForbiddenException('token-expired');
    }

    const document = await this.prisma.files.findFirst({
      where: { hash: obj.hash },
    });

    const file = createReadStream(join(process.cwd(), document.fullPath));

    return { file, document };
  }
}

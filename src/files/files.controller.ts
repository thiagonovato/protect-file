import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':token')
  async findOne(@Param('token') token: string, @Res() response: Response) {
    const result = await this.filesService.findOne(token);
    response.contentType('jpg');
    result.file.pipe(response);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  upload(@UploadedFile() file) {
    console.log(file);
    const newFile: CreateFileDto = {
      name: file.originalname,
      fullPath: file.path,
    };
    return this.filesService.create(newFile);
  }
}

import {
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesServiceAbstract } from './files-service-abstract/files-service-abstract';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayloadDto } from '../auth/dtos/jwt-payload.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesServiceAbstract) {}

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Get()
  getFiles() {
    return this.filesService.getListOfFiles();
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    file: Express.Multer.File,
    @User() user: JwtPayloadDto,
  ) {
    await this.filesService.uploadFile({
      fileName: file.originalname,
      file: file.buffer,
      info: {
        purpose: 'file',
        userId: user.id,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    file: Express.Multer.File,
    @User() user: JwtPayloadDto,
  ) {
    return user;
    // await this.filesService.uploadFile({
    //   fileName: file.originalname,
    //   file: file.buffer,
    // });
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    await this.filesService.deleteFile(fileName);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Get(':fileName')
  async downloadFile(
    @Param('fileName') fileName: string,
  ): Promise<StreamableFile> {
    return new StreamableFile(await this.filesService.downloadFile(fileName));
  }
}

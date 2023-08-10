import {
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesServiceAbstract } from './files-service-abstract/files-service-abstract';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayloadDto } from '../auth/dtos/jwt-payload.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesServiceAbstract) {}

  @ApiOperation({ summary: 'Get list of files from AWS S3' })
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Get()
  getFiles() {
    return this.filesService.getListOfFiles();
  }

  @ApiOperation({ summary: 'Upload file to AWS S3' })
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
  ) {
    return this.filesService.uploadFile({
      fileName: file.originalname,
      file: file.buffer,
    });
  }

  @ApiOperation({ summary: 'Upload avatar to AWS S3' })
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
    const fileName = user.id + '_' + file.originalname;
    return this.filesService.uploadFile({
      fileName,
      file: file.buffer,
    });
  }

  @ApiOperation({ summary: 'Delete file from AWS S3' })
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    this.filesService.deleteFile(fileName);
  }

  @ApiOperation({ summary: 'Download file from AWS S3' })
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Get(':fileName')
  async downloadFile(
    @Param('fileName') fileName: string,
  ): Promise<StreamableFile> {
    return new StreamableFile(await this.filesService.downloadFile(fileName));
  }
}

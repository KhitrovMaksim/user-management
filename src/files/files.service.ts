import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { FilesServiceAbstract } from './files-service-abstract/files-service-abstract';
import { UploadFileDto } from './dto/upload-file.dto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FilesService extends FilesServiceAbstract {
  private readonly awsRegion: string;
  private readonly s3BucketName: string;
  private readonly client: S3Client;

  constructor(private readonly configService: ConfigService) {
    super();
    this.awsRegion = this.configService.getOrThrow('AWS_REGION');
    this.s3BucketName = this.configService.getOrThrow('AWS_S3_BUCKET');
    this.client = new S3Client({ region: this.awsRegion });
  }

  async getListOfFiles(): Promise<ListObjectsCommandOutput> {
    return await this.client.send(
      new ListObjectsCommand({
        Bucket: this.s3BucketName,
      }),
    );
  }

  async uploadFile(dto: UploadFileDto): Promise<PutObjectCommandOutput> {
    const file: PutObjectCommandOutput = await this.client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Key: dto.fileName,
        Body: dto.file,
      }),
    );

    return file;
  }

  async deleteFile(fileName: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Key: fileName,
      }),
    );
  }

  async downloadFile(fileName: string): Promise<Uint8Array> {
    const command: GetObjectCommand = new GetObjectCommand({
      Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
      Key: fileName,
    });
    const downloadedFile: GetObjectCommandOutput = await this.client.send(
      command,
    );
    return await downloadedFile.Body.transformToByteArray();
  }

  async getFileUrl(fileName: string): Promise<string> {
    const input: GetObjectCommandInput = {
      Bucket: this.s3BucketName,
      Key: fileName,
    };
    const command: GetObjectCommand = new GetObjectCommand(input);
    const url: string = await getSignedUrl(this.client, command);
    return url;
  }
}

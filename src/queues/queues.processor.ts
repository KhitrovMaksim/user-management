import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import {
  SQSClient,
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { AvatarMessageDto } from './dtos/avatar-message.dto';
import { FilesServiceAbstract } from '../files/files-service-abstract/files-service-abstract';
import { UsersServiceAbstract } from '../users/users-service-abstract/users-service-abstract';

@Injectable()
export class QueuesProcessor {
  private readonly queueUrl: string;
  private readonly awsRegion: string;
  private readonly client: SQSClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly filesService: FilesServiceAbstract,
    private readonly usersService: UsersServiceAbstract,
  ) {
    this.queueUrl = this.configService.getOrThrow('QUEUE_URL');
    this.awsRegion = this.configService.getOrThrow('AWS_REGION');
    this.client = new SQSClient({ region: this.awsRegion });
  }

  @Interval(999999999)
  async processor() {
    try {
      const response: ReceiveMessageCommandOutput = await this.client.send(
        new ReceiveMessageCommand({
          MaxNumberOfMessages: 1,
          QueueUrl: this.queueUrl,
          WaitTimeSeconds: 3,
          AttributeNames: ['All'],
        }),
      );
      if (response.Messages) {
        const message = JSON.parse(response.Messages[0].Body);
        await this.avatarConsumer(message);
        await this.deleteMessageFromQueue(response.Messages[0].ReceiptHandle);
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteMessageFromQueue(receiptHandle: string) {
    await this.client.send(
      new DeleteMessageCommand({
        QueueUrl: this.queueUrl,
        ReceiptHandle: receiptHandle,
      }),
    );
  }

  async avatarConsumer(message: AvatarMessageDto) {
    const userId: string = message.Records[0].s3.object.key.split('_')[0];
    const avatarUrl: string = await this.filesService.getFileUrl(
      message.Records[0].s3.object.key,
    );
    await this.usersService.addAvatarUrl(userId, avatarUrl);
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  messages: any;

  constructor(response: string | Record<string, any>) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}

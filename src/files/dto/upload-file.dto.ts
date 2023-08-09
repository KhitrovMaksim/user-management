export class UploadFileDto {
  readonly fileName: string;
  readonly file: Buffer;
  readonly info: {
    purpose: string;
    userId: string;
  };
}

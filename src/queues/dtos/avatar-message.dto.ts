export class AvatarMessageDto {
  readonly Records: [
    {
      s3: {
        object: {
          key: string;
        };
      };
    },
  ];
}

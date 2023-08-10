export class JwtPayloadDto {
  id: string;
  nickname: string;
  role: string;
  updatedAt: string;
  iat: number;
  exp: number;
}

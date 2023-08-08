import { AddPayloadInterface } from '../interfaces/add-payload.interface';

export abstract class TokenServiceAbstract {
  abstract generateJwtToken(payload: AddPayloadInterface): Promise<string>;
}

export class AddVoteDto {
  readonly voterId: string;
  readonly profileId: string;
  readonly vote: 'increment' | 'decrement';
}

import { AddVoteDto } from '../dtos/add-vote.dto';
import { Vote } from '../schemas/vote.schema';
import mongoose from 'mongoose';
import { DeleteVoteDto } from '../dtos/delete-vote.dto';

export abstract class VotesServiceAbstract {
  abstract addVote(voteDto: AddVoteDto): Promise<Vote>;
  abstract updateVote(voteDto: AddVoteDto): Promise<Vote>;
  abstract deleteVote(
    voteDto: DeleteVoteDto,
  ): Promise<mongoose.mongo.DeleteResult>;
}

import {
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VotesServiceAbstract } from './votes-service-abstract/votes-service-abstract';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddVoteDto } from './dtos/add-vote.dto';
import { JwtService } from '@nestjs/jwt';
import { DeleteVoteDto } from './dtos/delete-vote.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayloadDto } from '../auth/dtos/jwt-payload.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Votes')
@Controller('votes')
export class VotesController {
  constructor(
    private readonly votesService: VotesServiceAbstract,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Voting' })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  add(
    @Param('id') id: string,
    @Query() vote: { vote: 'increment' | 'decrement' },
    @User() user: JwtPayloadDto,
  ) {
    if (user.id === id)
      throw new HttpException(
        'You can not vote for themselves.',
        HttpStatus.CONFLICT,
      );

    const voteDto: AddVoteDto = {
      voterId: user.id,
      profileId: id,
      vote: vote.vote,
    };

    return this.votesService.addVote(voteDto);
  }

  @ApiOperation({ summary: 'Update vote' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Query() vote: { vote: 'increment' | 'decrement' },
    @User() user: JwtPayloadDto,
  ) {
    if (user.id === id)
      throw new HttpException(
        'You can not vote for themselves.',
        HttpStatus.CONFLICT,
      );

    const voteDto: AddVoteDto = {
      voterId: user.id,
      profileId: id,
      vote: vote.vote,
    };

    return this.votesService.updateVote(voteDto);
  }

  @ApiOperation({ summary: 'Delete vote' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @User() user: JwtPayloadDto) {
    const voteDto: DeleteVoteDto = {
      voterId: user.id,
      profileId: id,
    };
    return this.votesService.deleteVote(voteDto);
  }
}

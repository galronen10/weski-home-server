import { IsString, IsNotEmpty, IsUrl, IsInt } from 'class-validator';
import { User } from './user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  imageUrl: string;

  @IsInt()
  totalScore: number;
}

export class UpdateScoreDto {
  @IsInt()
  @IsNotEmpty()
  scoreToAdd: number;
}

export interface UserRankAndSurroundingRes {
  userId: number;
  rank: number;
  surroundingUsers: User[];
}

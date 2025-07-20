import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateScoreDto,
  User,
  UserRankAndSurroundingRes,
} from './entities';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Post(':id/score')
  updateScore(
    @Param('id')
    id: string,
    @Body() dto: UpdateScoreDto,
  ): Promise<User> {
    return this.userService.updateScore(+id, dto);
  }

  @Get('leaderboard')
  getTopN(@Query('limit') limit = 10): Promise<User[]> {
    return this.userService.getTopN(+limit);
  }

  @Get(':id/around')
  getUserRankAndSurrounding(
    @Param('id') id: string,
  ): Promise<UserRankAndSurroundingRes> {
    return this.userService.getUserRankAndSurrounding(+id);
  }
}

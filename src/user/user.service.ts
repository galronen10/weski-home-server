import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import {
  User,
  CreateUserDto,
  UpdateScoreDto,
  RankedUser,
  UserRankAndSurroundingRes,
} from './entities';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(RankedUser)
    private readonly rankedUserRepo: Repository<RankedUser>,
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user: User = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async updateScore(userId: number, dto: UpdateScoreDto): Promise<User> {
    const user: User | null = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    user.totalScore += dto.scoreToAdd;
    return this.userRepo.save(user);
  }

  async getTopN(limit: number): Promise<User[]> {
    const key = `leaderboard:top:${limit}`;
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached);

    return this.userRepo.find({
      order: { totalScore: 'DESC' },
      take: limit,
    });
  }

  async getUserRankAndSurrounding(
    userId: number,
  ): Promise<UserRankAndSurroundingRes> {
    const currentUser: RankedUser | null = await this.rankedUserRepo.findOneBy({
      id: userId,
    });
    if (!currentUser) throw new NotFoundException('User not found');

    const minRank = Math.max(1, currentUser.rank - 5);
    const maxRank = +currentUser.rank + 5;

    const surroundingUsers: User[] = await this.rankedUserRepo.findBy({
      rank: Between(minRank, maxRank),
    });

    return {
      userId,
      rank: currentUser.rank,
      surroundingUsers: surroundingUsers.filter((user) => user.id !== userId),
    };
  }
}

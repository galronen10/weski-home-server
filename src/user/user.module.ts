import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RankedUser, User } from './entities';
import { RedisModule } from '@/redis.module';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([User, RankedUser])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

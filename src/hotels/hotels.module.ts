import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}

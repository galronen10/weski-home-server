/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DefaultProviderService } from './defaultProvider.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [DefaultProviderService],
})
export class ProvidersModule {}

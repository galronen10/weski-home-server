import { HotelsGateway } from './hotels.gateway';
import { HotelsService } from './hotels.service';
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [DiscoveryModule, ProvidersModule],
  controllers: [],
  providers: [HotelsService, HotelsGateway],
})
export class HotelsModule {}

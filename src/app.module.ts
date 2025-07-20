import { ProvidersModule } from './hotels/providers/providers.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HotelsModule } from './hotels/hotels.module';

@Module({
  imports: [ProvidersModule, HotelsModule, ConfigModule.forRoot()],
})
export class AppModule {}

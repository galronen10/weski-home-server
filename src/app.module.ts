import { HotelsModule } from './hotels/hotels.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user';

@Module({
  imports: [HotelsModule, ConfigModule.forRoot(), UserModule],
})
export class AppModule {}

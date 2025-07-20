// src/hotels/hotels.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { HotelsService } from './hotels.service';
import { IHotelSearchDTO } from '@/entities';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class HotelsGateway implements OnGatewayDisconnect {
  constructor(private readonly hotelsService: HotelsService) {}

  @SubscribeMessage('request')
  handleRequest(
    @MessageBody() hotelSearchDTO: IHotelSearchDTO,
    @ConnectedSocket() client: Socket,
  ) {
    this.hotelsService.searchHotels(client, hotelSearchDTO);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.hotelsService.abortOnDisconnect(client.id);
  }
}

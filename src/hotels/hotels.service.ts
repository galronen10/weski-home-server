/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Socket } from 'socket.io';
import { HotelProvider } from './providers/hotel-provider.abstract';
import { IHotelSearchDTO } from '@/entities';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { HOTEL_PROVIDER } from './decorators/hotel-provider.decorator';

@Injectable()
export class HotelsService implements OnModuleInit {
  private abortControllers = new Map<string, AbortController>();
  private providers: HotelProvider[] = [];

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  async onModuleInit() {
    const providers = this.discoveryService.getProviders();
    this.providers = providers
      .map((wrapper) => wrapper.instance)
      .filter(
        (instance): instance is HotelProvider =>
          !!instance &&
          this.reflector.get(HOTEL_PROVIDER, instance.constructor),
      );
  }

  searchHotels(socket: Socket, hotelSearchDTO: IHotelSearchDTO) {
    this.abortPrevious(socket.id);
    const controller = new AbortController();
    this.abortControllers.set(socket.id, controller);

    for (const provider of this.providers) {
      void this.runProviderStream(
        socket,
        provider,
        hotelSearchDTO,
        controller.signal,
      );
    }
  }

  private async runProviderStream(
    socket: Socket,
    provider: HotelProvider,
    hotelSearchDTO: IHotelSearchDTO,
    signal: AbortSignal,
  ) {
    try {
      for await (const result of provider.search(hotelSearchDTO, signal)) {
        socket.emit('response', {
          type: 'searchHotelsPartial',
          provider: provider.name,
          result,
        });
      }
    } catch (err) {
      // if (err.message !== 'Aborted') {
      //   socket.emit('response', {
      //     type: 'searchHotelsPartial',
      //     provider: provider.name,
      //     error: err.message,
      //   });
      // }
    }
  }

  private abortPrevious(socketId: string) {
    const controller = this.abortControllers.get(socketId);
    if (controller) controller.abort();
  }

  abortOnDisconnect(socketId: string) {
    const controller = this.abortControllers.get(socketId);
    if (controller) controller.abort();
    this.abortControllers.delete(socketId);
  }
}

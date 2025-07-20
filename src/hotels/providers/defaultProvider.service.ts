import { Injectable } from '@nestjs/common';
import { HotelProviderTag } from '../decorators/hotel-provider.decorator';
import {
  Hotel,
  HotelApiResponse,
  IHotelSearchDTO,
  maxGroupSize,
} from '@/entities';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HotelProvider } from './hotel-provider.abstract';

@HotelProviderTag()
@Injectable()
export class DefaultProviderService extends HotelProvider {
  url =
    'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator';

  constructor(private readonly httpService: HttpService) {
    super();
  }

  get name(): string {
    return 'default provider';
  }

  async *search(
    hotelSearchDTO: IHotelSearchDTO,
    signal: AbortSignal,
  ): AsyncGenerator<Hotel[]> {
    for (
      let groupSizeForSend = hotelSearchDTO.group_size;
      groupSizeForSend <= maxGroupSize;
      groupSizeForSend++
    ) {
      if (signal.aborted) return;

      const response = await firstValueFrom(
        this.httpService.post<HotelApiResponse>(this.url, {
          query: {
            ...hotelSearchDTO,
            group_size: groupSizeForSend,
          } as IHotelSearchDTO,
        }),
      );

      const resData = response.data.body;
      if (resData.success !== 'true') return [];

      yield resData.accommodations.map((acc) => this.mapToHotel(acc));
    }
  }
}

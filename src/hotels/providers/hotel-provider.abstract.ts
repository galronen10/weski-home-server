import { Accommodation, Hotel, IHotelSearchDTO } from '@/entities';

export abstract class HotelProvider {
  abstract get name(): string;

  abstract search(
    hotelSearchDTO: IHotelSearchDTO,
    signal?: AbortSignal,
  ): AsyncGenerator<Hotel[]>;

  protected mapToHotel(acc: Accommodation, siteId: number): Hotel {
    return {
      id: acc.HotelCode,
      name: acc.HotelName,
      rating: +acc.HotelInfo.Rating,
      price: +acc.PricesInfo.AmountAfterTax,
      imageUrl:
        acc.HotelDescriptiveContent.Images.find((img) => img.MainImage)?.URL ??
        '',
      siteId,
    };
  }
}

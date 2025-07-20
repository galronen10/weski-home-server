import { Accommodation, Hotel, IHotelSearchDTO } from '@/entities';

export abstract class HotelProvider {
  abstract get name(): string;

  abstract search(
    hotelSearchDTO: IHotelSearchDTO,
    signal?: AbortSignal,
  ): AsyncGenerator<Hotel[]>;

  protected mapToHotel(acc: Accommodation): Hotel {
    return {
      id: acc.HotelCode,
      name: acc.HotelName,
      rating: +acc.HotelInfo.Rating,
      latitude: +acc.HotelInfo.Position.Latitude,
      longitude: +acc.HotelInfo.Position.Longitude,
      beds: +acc.HotelInfo.Beds,
      price: +acc.PricesInfo.AmountAfterTax,
      images: acc.HotelDescriptiveContent.Images.map((img) => img.URL),
      distances: acc.HotelInfo.Position.Distances.map((d) => ({
        type: d.type,
        distance: d.distance,
      })),
    };
  }
}

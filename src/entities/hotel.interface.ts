export interface IHotelSearchDTO {
  ski_site: number;
  from_date: Date;
  to_date: Date;
  group_size: number;
}

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  latitude: number;
  longitude: number;
  beds: number;
  price: number;
  images: string[];
  distances: { type: string; distance: string }[];
}

export const maxGroupSize = 10;

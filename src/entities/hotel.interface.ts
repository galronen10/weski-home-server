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
  siteId: number;
  price: number;
  imageUrl: string;
}

export const maxGroupSize = 10;

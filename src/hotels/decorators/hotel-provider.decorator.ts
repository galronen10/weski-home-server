import { SetMetadata } from '@nestjs/common';

export const HOTEL_PROVIDER = 'HOTEL_PROVIDER';

export function HotelProviderTag() {
  return SetMetadata(HOTEL_PROVIDER, true);
}

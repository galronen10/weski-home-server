export interface HotelApiResponse {
  body: HotelApiResponseRes;
  status: number;
}
export interface HotelApiResponseRes {
  success: string;
  accommodations: Accommodation[];
}
export interface HotelImage {
  URL: string;
  MainImage?: string;
}

export interface DistanceInfo {
  type: string;
  distance: string;
}

export interface Accommodation {
  HotelCode: string;
  HotelName: string;
  HotelDescriptiveContent: {
    Images: HotelImage[];
  };
  HotelInfo: {
    Position: {
      Latitude: string;
      Longitude: string;
      Distances: DistanceInfo[];
    };
    Rating: string;
    Beds: string;
  };
  PricesInfo: {
    AmountAfterTax: string;
    AmountBeforeTax: string;
  };
}

import {Image} from './image';

export interface House {
  houseId?: number;
  houseName?: string;
  houseAddress?: string;
  area?: string;
  type?: string;
  bedroomQuantity?: string;
  bathroomQuantity?: string;
  description?: string;
  pricePerDay?: string;
  image?: any[];
  houseStatus?: boolean;
}

export interface RestaurantAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Restaurant {
  id?: number | null;
  image?: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  contact: string;
  createdAt?: string;
  updatedAt?: string;
}
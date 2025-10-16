import Restaurant from "../models/Restaurant.js";

export interface IRestaurantService {
  getAllRestaurants(): Promise<Restaurant[]>;
  findByName(name: string): Promise<Restaurant | null>;
  findById(id: number): Promise<Restaurant | null>;
  createRestaurant(data: CreateRestaurantInput): Promise<Restaurant>;
  updateRestaurant(
    id: number,
    data: UpdateRestaurantInput
  ): Promise<Restaurant | null>;
  deleteRestaurant(id: number): Promise<boolean>;
}

export interface CreateRestaurantInput {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  contact: string;
}

export type UpdateRestaurantInput = Partial<CreateRestaurantInput>;

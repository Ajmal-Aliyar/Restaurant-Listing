import Restaurant from "../models/Restaurant.js";
import { IBaseRepository } from "./i-base-repo.js";

export interface IRestaurantRepo extends IBaseRepository<Restaurant> {
   findByName(name: string): Promise<Restaurant | null>
}

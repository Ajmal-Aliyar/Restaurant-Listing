
import { injectable } from "inversify";
import Restaurant from "../models/Restaurant.js";
import { BaseRepository } from "./base.repo.js";
import { IRestaurantRepo } from "./i-restaurant.repo.js";

@injectable()
export class RestaurantRepo
  extends BaseRepository<Restaurant>
  implements IRestaurantRepo
{
  constructor() {
    super(Restaurant);
  }

  async findByName(name: string): Promise<Restaurant | null> {
    return await this.model.findOne({ where: { name } });
  }
}

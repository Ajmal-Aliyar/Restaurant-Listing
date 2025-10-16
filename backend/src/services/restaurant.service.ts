import { injectable, inject } from "inversify";
import Restaurant from '../models/Restaurant.js';
import { IRestaurantRepo } from '../repositories/i-restaurant.repo.js';
import { CreateRestaurantInput, IRestaurantService, UpdateRestaurantInput } from './i-restaurant-service.js';
import { TYPES } from '../inversify/types.js';

@injectable()
export class RestaurantService implements IRestaurantService {
  private readonly repo: IRestaurantRepo;

  constructor(@inject(TYPES.RestaurantRepository) repo: IRestaurantRepo) {
    this.repo = repo;
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.repo.findAll();
  }

  async findByName(name: string): Promise<Restaurant | null> {
    return this.repo.findByName(name);
  }

  async findById(id: number): Promise<Restaurant | null> {
    return this.repo.findById(id);
  }

  async createRestaurant(data: CreateRestaurantInput): Promise<Restaurant> {
    return this.repo.create(data);
  }

  async updateRestaurant(
    id: number,
    data: UpdateRestaurantInput
  ): Promise<Restaurant | null> {
    return this.repo.updateById(id, data);
  }

  async deleteRestaurant(id: number): Promise<boolean> {
    return this.repo.deleteById(id);
  }
}

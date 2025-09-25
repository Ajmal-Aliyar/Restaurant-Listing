import { RestaurantRepository } from '../repositories/restaurant.repository.js';

export class RestaurantService {
  private repo: RestaurantRepository;
  constructor() {
    this.repo = new RestaurantRepository();
  }

  async getAllRestaurants() {
    return this.repo.getAll();
  }

  async findByName(name: string) {
    return this.repo.findByName(name);
  }

  async findById(id: number) {
    return this.repo.findById(id);
  }

  async createRestaurant(data: any) {
    return this.repo.create(data);
  }

  async updateRestaurant(id: number, data: any) {
    return this.repo.update(id, data);
  }

  async deleteRestaurant(id: number) {
    return this.repo.delete(id);
  }
}

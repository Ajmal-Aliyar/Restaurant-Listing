import Restaurant from '../models/Restaurant.js';

export class RestaurantRepository {
  async getAll() {
    return Restaurant.findAll();
  }

  async findByName(name: string) {
    return Restaurant.findOne({ where: { name } });
  }

  async findById(id: number) {
    return Restaurant.findByPk(id);
  }

  async create(data: any) {
    return Restaurant.create(data);
  }

  async update(id: number, data: any) {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) return null;
    await restaurant.update(data);
    return restaurant;
  }

  async delete(id: number) {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) return null;
    await restaurant.destroy();
    return true;
  }
}

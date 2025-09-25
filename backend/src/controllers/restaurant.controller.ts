import { Request, Response } from "express";
import { RestaurantService } from "../services/restaurant.service.js";

const service = new RestaurantService();


export const getAllRestaurants = async (_req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await service.getAllRestaurants();
    console.log("🚀 ~ Restaurants fetched:", restaurants.length);
    res.json(restaurants);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, ...restOfBody } = req.body;
    console.log(req.body)
    const existingRestaurant = await service.findByName(name);
    if (existingRestaurant) {
      console.error(`Attempted to create a duplicate restaurant: ${name}`);
       res
        .status(409)
        .json({ error: "A restaurant with this name already exists." });
        return
    }
    const restaurant = await service.createRestaurant({ name, ...address,...restOfBody });
    console.log("🚀 ~ Restaurant created:", restaurant.toJSON());
    res.status(201).json(restaurant);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await service.updateRestaurant(Number(req.params.id), req.body);
    if (!updated) {
      console.log("🚀 ~ Update failed: Restaurant not found");
      res.status(404).json({ error: "Restaurant not found" });
    }
    console.log("🚀 ~ Restaurant updated:", updated?.toJSON());
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await service.deleteRestaurant(Number(req.params.id));
    if (!deleted) {
      console.log("🚀 ~ Deletion failed: Restaurant not found");
      res.status(404).json({ error: "Restaurant not found" });
    }
    console.log("🚀 ~ Restaurant deleted:", req.params.id);
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { IRestaurantService } from "../services/i-restaurant-service.js";
import { 
  IRestaurantController, 
  CreateRestaurantRequest, 
  UpdateRestaurantRequest, 
  ErrorResponse 
} from "./i-restaurant-controller.js";
import { TYPES } from "../inversify/types.js";

@injectable()
export class RestaurantController implements IRestaurantController {
  private readonly service: IRestaurantService;

  constructor(@inject(TYPES.RestaurantService) service: IRestaurantService) {
    this.service = service;
  }

  async getAllRestaurants(_req: Request, res: Response): Promise<void> {
    try {
      const restaurants = await this.service.getAllRestaurants();
      console.log("📋 Restaurants fetched:", restaurants.length);
      res.json(restaurants);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error("❌ Error fetching restaurants:", errorMessage);
      const errorResponse: ErrorResponse = { error: "Failed to fetch restaurants" };
      res.status(500).json(errorResponse);
    }
  }

  async createRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { name, address, contact }: CreateRestaurantRequest = req.body;
      
      // Input validation
      if (!name || !address || !contact) {
        const errorResponse: ErrorResponse = { 
          error: "Missing required fields",
          details: "name, address (street, city, state, zip), and contact are required"
        };
        res.status(400).json(errorResponse);
        return;
      }

      // Check for existing restaurant
      const existingRestaurant = await this.service.findByName(name);
      if (existingRestaurant) {
        console.error(`⚠️ Attempted to create duplicate restaurant: ${name}`);
        const errorResponse: ErrorResponse = { 
          error: "Restaurant already exists",
          details: `A restaurant with name "${name}" already exists`
        };
        res.status(409).json(errorResponse);
        return;
      }

      // Create restaurant with flattened address structure
      const restaurantData = {
        name,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        contact
      };

      const restaurant = await this.service.createRestaurant(restaurantData);
      console.log("✅ Restaurant created:", restaurant.toJSON());
      res.status(201).json(restaurant);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error("❌ Error creating restaurant:", errorMessage);
      const errorResponse: ErrorResponse = { 
        error: "Failed to create restaurant",
        details: errorMessage
      };
      res.status(400).json(errorResponse);
    }
  }

  async updateRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updateData: UpdateRestaurantRequest = req.body;

      // Validate ID
      if (isNaN(id)) {
        const errorResponse: ErrorResponse = { 
          error: "Invalid ID",
          details: "Restaurant ID must be a valid number"
        };
        res.status(400).json(errorResponse);
        return;
      }

      // Check if restaurant exists
      const existingRestaurant = await this.service.findById(id);
      if (!existingRestaurant) {
        console.error(`❌ Update failed: Restaurant with ID ${id} not found`);
        const errorResponse: ErrorResponse = { 
          error: "Restaurant not found",
          details: `No restaurant found with ID ${id}`
        };
        res.status(404).json(errorResponse);
        return;
      }

      // Flatten address structure if present
      let flattenedData = { ...updateData };
      if (updateData.address) {
        const { address, ...rest } = updateData;
        flattenedData = {
          ...rest,
          ...address
        };
      }

      const updated = await this.service.updateRestaurant(id, flattenedData);
      if (!updated) {
        const errorResponse: ErrorResponse = { 
          error: "Update failed",
          details: "Failed to update restaurant"
        };
        res.status(500).json(errorResponse);
        return;
      }

      console.log("✅ Restaurant updated:", updated.toJSON());
      res.json(updated);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error("❌ Error updating restaurant:", errorMessage);
      const errorResponse: ErrorResponse = { 
        error: "Failed to update restaurant",
        details: errorMessage
      };
      res.status(400).json(errorResponse);
    }
  }

  async deleteRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      // Validate ID
      if (isNaN(id)) {
        const errorResponse: ErrorResponse = { 
          error: "Invalid ID",
          details: "Restaurant ID must be a valid number"
        };
        res.status(400).json(errorResponse);
        return;
      }

      // Check if restaurant exists
      const existingRestaurant = await this.service.findById(id);
      if (!existingRestaurant) {
        console.error(`❌ Deletion failed: Restaurant with ID ${id} not found`);
        const errorResponse: ErrorResponse = { 
          error: "Restaurant not found",
          details: `No restaurant found with ID ${id}`
        };
        res.status(404).json(errorResponse);
        return;
      }

      const deleted = await this.service.deleteRestaurant(id);
      if (!deleted) {
        const errorResponse: ErrorResponse = { 
          error: "Deletion failed",
          details: "Failed to delete restaurant"
        };
        res.status(500).json(errorResponse);
        return;
      }

      console.log("✅ Restaurant deleted:", id);
      res.json({ message: "Restaurant deleted successfully" });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error("❌ Error deleting restaurant:", errorMessage);
      const errorResponse: ErrorResponse = { 
        error: "Failed to delete restaurant",
        details: errorMessage
      };
      res.status(500).json(errorResponse);
    }
  }
}


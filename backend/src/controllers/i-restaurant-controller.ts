import { Request, Response } from "express";

export interface IRestaurantController {
  getAllRestaurants(req: Request, res: Response): Promise<void>;
  createRestaurant(req: Request, res: Response): Promise<void>;
  updateRestaurant(req: Request, res: Response): Promise<void>;
  deleteRestaurant(req: Request, res: Response): Promise<void>;
}

export interface CreateRestaurantRequest {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contact: string;
}

export interface UpdateRestaurantRequest {
  name?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  contact?: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

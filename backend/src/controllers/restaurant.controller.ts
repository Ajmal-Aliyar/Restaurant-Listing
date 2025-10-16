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
import { 
  HTTP_STATUS, 
  ERROR_MESSAGES, 
  LOG_MESSAGES, 
  SUCCESS_MESSAGES,
  RESPONSE_TEMPLATES,
  VALIDATION_RULES 
} from "../constants/index.js";

@injectable()
export class RestaurantController implements IRestaurantController {
  private readonly service: IRestaurantService;

  constructor(@inject(TYPES.RestaurantService) service: IRestaurantService) {
    this.service = service;
  }

  async getAllRestaurants(_req: Request, res: Response): Promise<void> {
    try {
      const restaurants = await this.service.getAllRestaurants();
      console.log(`${LOG_MESSAGES.RESTAURANTS_FETCHED} ${restaurants.length}`);
      res.json(restaurants);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
      console.error(LOG_MESSAGES.ERROR_FETCHING_RESTAURANTS, errorMessage);
      const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(ERROR_MESSAGES.RESTAURANTS_FETCH_FAILED);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }

  async createRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { name, address, contact }: CreateRestaurantRequest = req.body;
      
      if (!name || !address || !contact) {
        const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
          ERROR_MESSAGES.MISSING_REQUIRED_FIELDS,
          ERROR_MESSAGES.REQUIRED_FIELDS_DETAILS
        );
        res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse);
        return;
      }


      const existingRestaurant = await this.service.findByName(name);
      if (existingRestaurant) {
        console.error(`${LOG_MESSAGES.DUPLICATE_RESTAURANT_ATTEMPT} ${name}`);
        const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
          ERROR_MESSAGES.RESTAURANT_ALREADY_EXISTS,
          `A restaurant with name "${name}" already exists`
        );
        res.status(HTTP_STATUS.CONFLICT).json(errorResponse);
        return;
      }

      const restaurantData = {
        name,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        contact
      };

      const restaurant = await this.service.createRestaurant(restaurantData);
      console.log(`${LOG_MESSAGES.RESTAURANT_CREATED} ${restaurant.toJSON()}`);
      res.status(HTTP_STATUS.CREATED).json(restaurant);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
      console.error(LOG_MESSAGES.ERROR_CREATING_RESTAURANT, errorMessage);
      const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
        ERROR_MESSAGES.RESTAURANT_CREATION_FAILED,
        errorMessage
      );
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse);
    }
  }

  async updateRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updateData: UpdateRestaurantRequest = req.body;

      if (isNaN(id)) {
        const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
          ERROR_MESSAGES.INVALID_ID
        );
        res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse);
        return;
      }

      const existingRestaurant = await this.service.findById(id);
      if (!existingRestaurant) {
        console.error(`${LOG_MESSAGES.UPDATE_FAILED_NOT_FOUND} ID ${id}`);
        const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
          ERROR_MESSAGES.RESTAURANT_NOT_FOUND,
          `No restaurant found with ID ${id}`
        );
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse);
        return;
      }

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
        const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
          ERROR_MESSAGES.UPDATE_FAILED
        );
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse);
        return;
      }

      console.log(`${LOG_MESSAGES.RESTAURANT_UPDATED} ${updated.toJSON()}`);
      res.json(updated);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
      console.error(LOG_MESSAGES.ERROR_UPDATING_RESTAURANT, errorMessage);
      const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
        ERROR_MESSAGES.RESTAURANT_UPDATE_FAILED,
        errorMessage
      );
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse);
    }
  }

  async deleteRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
          ERROR_MESSAGES.INVALID_ID
        );
        res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse);
        return;
      }

      const existingRestaurant = await this.service.findById(id);
      if (!existingRestaurant) {
        console.error(`${LOG_MESSAGES.DELETION_FAILED_NOT_FOUND} ID ${id}`);
        const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
          ERROR_MESSAGES.RESTAURANT_NOT_FOUND,
          `No restaurant found with ID ${id}`
        );
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse);
        return;
      }

      const deleted = await this.service.deleteRestaurant(id);
      if (!deleted) {
        const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
          ERROR_MESSAGES.DELETION_FAILED
        );
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse);
        return;
      }

      console.log(`${LOG_MESSAGES.RESTAURANT_DELETED} ${id}`);
      res.json(RESPONSE_TEMPLATES.SUCCESS(SUCCESS_MESSAGES.RESTAURANT_DELETED));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
      console.error(LOG_MESSAGES.ERROR_DELETING_RESTAURANT, errorMessage);
      const errorResponse: ErrorResponse = RESPONSE_TEMPLATES.ERROR(
        ERROR_MESSAGES.RESTAURANT_DELETION_FAILED,
        errorMessage
      );
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }
}


import express from 'express';
import { IRestaurantController } from '../controllers/i-restaurant-controller.js';
import { TYPES } from '../inversify/types.js';
import container from '../config/inversify.config.js';

// Get controller instance from Inversify container
const restaurantController = container.get<IRestaurantController>(TYPES.RestaurantController);

const router = express.Router();

router.route('/')
  .get(restaurantController.getAllRestaurants.bind(restaurantController))
  .post(restaurantController.createRestaurant.bind(restaurantController));

router.route('/:id')
  .patch(restaurantController.updateRestaurant.bind(restaurantController))
  .delete(restaurantController.deleteRestaurant.bind(restaurantController));

export default router; 
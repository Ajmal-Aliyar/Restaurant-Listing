import express from 'express';
import {
  getAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurant.controller.js';


const router = express.Router();

router.route('/')
  .get(getAllRestaurants)
  .post(createRestaurant);

router.route('/:id')
  .patch(updateRestaurant)
  .delete(deleteRestaurant);

export default router; 
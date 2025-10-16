import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../inversify/types.js";
import { IRestaurantRepo } from "../repositories/i-restaurant.repo.js";
import { RestaurantRepo } from "../repositories/restaurant.repo.js";
import { IRestaurantService } from "../services/i-restaurant-service.js";
import { RestaurantService } from "../services/restaurant.service.js";
import { IRestaurantController } from "../controllers/i-restaurant-controller.js";
import { RestaurantController } from "../controllers/restaurant.controller.js";

// Create and configure the container
export const container = new Container();

// Bind repositories
container.bind<IRestaurantRepo>(TYPES.RestaurantRepository).to(RestaurantRepo).inSingletonScope();

// Bind services
container.bind<IRestaurantService>(TYPES.RestaurantService).to(RestaurantService).inSingletonScope();

// Bind controllers
container.bind<IRestaurantController>(TYPES.RestaurantController).to(RestaurantController).inSingletonScope();

export default container;

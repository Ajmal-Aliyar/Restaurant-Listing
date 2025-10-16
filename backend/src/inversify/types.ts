// Inversify dependency injection symbols
export const TYPES = {
  // Repositories
  RestaurantRepository: Symbol.for("RestaurantRepository"),
  
  // Services
  RestaurantService: Symbol.for("RestaurantService"),
  
  // Controllers
  RestaurantController: Symbol.for("RestaurantController"),
} as const;

export default TYPES;

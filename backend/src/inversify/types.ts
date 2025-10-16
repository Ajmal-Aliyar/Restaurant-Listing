export const TYPES = {
  RestaurantRepository: Symbol.for("RestaurantRepository"),
  RestaurantService: Symbol.for("RestaurantService"),
  RestaurantController: Symbol.for("RestaurantController"),
} as const;

export default TYPES;

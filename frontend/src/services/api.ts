import api from "../config/axios.config";
import type { Restaurant } from "../types/Restaurant";

export const getRestaurants = async () => {
  const res = await api.get(`/`);
  console.log(res)
  return res;
};

export const addRestaurant = async (restaurant: Restaurant) => {
  const res = await api.post("/", restaurant);
  return res;
};

export const updateRestaurant = async (id: number, restaurant: Restaurant) => {
  const res = await api.patch(`/${id}`, restaurant);
  return res;
};

export const deleteRestaurant = async (id: number) => {
  const res = await api.delete(`/${id}`);
  return res;
};

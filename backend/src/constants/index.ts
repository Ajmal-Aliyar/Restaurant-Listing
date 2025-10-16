export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  UNKNOWN_ERROR: 'Unknown error occurred',
  INVALID_ID: 'Restaurant ID must be a valid number',
  
  RESTAURANT_NOT_FOUND: 'Restaurant not found',
  RESTAURANT_ALREADY_EXISTS: 'Restaurant already exists',
  RESTAURANT_CREATION_FAILED: 'Failed to create restaurant',
  RESTAURANT_UPDATE_FAILED: 'Failed to update restaurant',
  RESTAURANT_DELETION_FAILED: 'Failed to delete restaurant',
  RESTAURANTS_FETCH_FAILED: 'Failed to fetch restaurants',
  
  MISSING_REQUIRED_FIELDS: 'Missing required fields',
  REQUIRED_FIELDS_DETAILS: 'name, address (street, city, state, zip), and contact are required',
  
  UPDATE_FAILED: 'Update failed',
  DELETION_FAILED: 'Deletion failed',
  OPERATION_FAILED: 'Failed to delete restaurant',
} as const;

export const SUCCESS_MESSAGES = {
  RESTAURANT_CREATED: 'Restaurant created successfully',
  RESTAURANT_UPDATED: 'Restaurant updated successfully',
  RESTAURANT_DELETED: 'Restaurant deleted successfully',
} as const;

export const LOG_MESSAGES = {
  RESTAURANTS_FETCHED: 'Restaurants fetched:',
  RESTAURANT_CREATED: 'Restaurant created:',
  RESTAURANT_UPDATED: 'Restaurant updated:',
  RESTAURANT_DELETED: 'Restaurant deleted:',
  
  ERROR_FETCHING_RESTAURANTS: 'Error fetching restaurants:',
  ERROR_CREATING_RESTAURANT: 'Error creating restaurant:',
  ERROR_UPDATING_RESTAURANT: 'Error updating restaurant:',
  ERROR_DELETING_RESTAURANT: 'Error deleting restaurant:',
  
  DUPLICATE_RESTAURANT_ATTEMPT: 'Attempted to create duplicate restaurant:',
  UPDATE_FAILED_NOT_FOUND: 'Update failed: Restaurant not found',
  DELETION_FAILED_NOT_FOUND: 'Deletion failed: Restaurant not found',
} as const;

export const API_ENDPOINTS = {
  RESTAURANTS: '/api/restaurants',
  RESTAURANTS_BY_ID: '/api/restaurants/:id',
} as const;

export const DATABASE_CONFIG = {
  DEFAULT_PORT: 5000,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',
} as const;

export const VALIDATION_RULES = {
  REQUIRED_FIELDS: ['name', 'address', 'contact'],
  ADDRESS_REQUIRED_FIELDS: ['street', 'city', 'state', 'zip'],
} as const;

export const RESPONSE_TEMPLATES = {
  ERROR: (message: string, details?: string) => ({
    error: message,
    ...(details && { details }),
  }),
  
  SUCCESS: (message: string, data?: any) => ({
    message,
    ...(data && { data }),
  }),
} as const;

export default {
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOG_MESSAGES,
  API_ENDPOINTS,
  DATABASE_CONFIG,
  VALIDATION_RULES,
  RESPONSE_TEMPLATES,
};

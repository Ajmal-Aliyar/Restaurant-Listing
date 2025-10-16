# Constants Management

This document explains the centralized constants implementation in the Restaurant Listing Platform backend.

## Overview

All hardcoded values, configuration settings, error messages, and other constants have been centralized in the `constants/index.ts` file for better maintainability and consistency.

## File Structure

```
src/constants/
├── index.ts          # Main constants file
└── README.md         # This documentation
```

## Constants Categories

### 1. HTTP Status Codes (`HTTP_STATUS`)
Centralized HTTP status codes for consistent API responses:
```typescript
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
```

### 2. Error Messages (`ERROR_MESSAGES`)
Standardized error messages across the application:
```typescript
export const ERROR_MESSAGES = {
  UNKNOWN_ERROR: 'Unknown error occurred',
  INVALID_ID: 'Restaurant ID must be a valid number',
  RESTAURANT_NOT_FOUND: 'Restaurant not found',
  RESTAURANT_ALREADY_EXISTS: 'Restaurant already exists',
  // ... more error messages
} as const;
```

### 3. Success Messages (`SUCCESS_MESSAGES`)
Consistent success messages for API responses:
```typescript
export const SUCCESS_MESSAGES = {
  RESTAURANT_CREATED: 'Restaurant created successfully',
  RESTAURANT_UPDATED: 'Restaurant updated successfully',
  RESTAURANT_DELETED: 'Restaurant deleted successfully',
} as const;
```

### 4. Log Messages (`LOG_MESSAGES`)
Standardized logging messages for better debugging:
```typescript
export const LOG_MESSAGES = {
  RESTAURANTS_FETCHED: 'Restaurants fetched:',
  RESTAURANT_CREATED: 'Restaurant created:',
  ERROR_FETCHING_RESTAURANTS: 'Error fetching restaurants:',
  // ... more log messages
} as const;
```

### 5. API Endpoints (`API_ENDPOINTS`)
Centralized API route definitions:
```typescript
export const API_ENDPOINTS = {
  RESTAURANTS: '/api/restaurants',
  RESTAURANTS_BY_ID: '/api/restaurants/:id',
} as const;
```

### 6. Database Configuration (`DATABASE_CONFIG`)
Environment and database-related constants:
```typescript
export const DATABASE_CONFIG = {
  DEFAULT_PORT: 5000,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',
} as const;
```

### 7. Validation Rules (`VALIDATION_RULES`)
Validation constraints and requirements:
```typescript
export const VALIDATION_RULES = {
  REQUIRED_FIELDS: ['name', 'address', 'contact'],
  ADDRESS_REQUIRED_FIELDS: ['street', 'city', 'state', 'zip'],
} as const;
```

### 8. Response Templates (`RESPONSE_TEMPLATES`)
Utility functions for consistent API response formatting:
```typescript
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
```

## Usage Examples

### In Controllers
```typescript
import { HTTP_STATUS, ERROR_MESSAGES, RESPONSE_TEMPLATES } from '../constants/index.js';

// Using constants for error responses
const errorResponse = RESPONSE_TEMPLATES.ERROR(
  ERROR_MESSAGES.RESTAURANT_NOT_FOUND,
  `No restaurant found with ID ${id}`
);
res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse);
```

### In Routes
```typescript
import { API_ENDPOINTS } from '../constants/index.js';

// Using constants for route definitions
app.use(API_ENDPOINTS.RESTAURANTS, restaurantRoutes);
```

### In Server Configuration
```typescript
import { DATABASE_CONFIG } from './constants/index.js';

// Using constants for server configuration
const PORT = process.env.PORT || DATABASE_CONFIG.DEFAULT_PORT;
app.use(cors({ origin: DATABASE_CONFIG.CLIENT_ORIGIN, credentials: true }));
```

## Benefits

### 1. **Maintainability**
- Single source of truth for all constants
- Easy to update messages or configuration values
- Reduces code duplication

### 2. **Consistency**
- Standardized error messages across the application
- Consistent HTTP status codes usage
- Uniform API response formats

### 3. **Type Safety**
- All constants are typed with `as const` for better TypeScript support
- Prevents typos and ensures correct usage
- IDE autocompletion and refactoring support

### 4. **Internationalization Ready**
- Centralized messages make it easy to implement i18n later
- All user-facing messages in one place
- Easy to replace with translation keys

### 5. **Configuration Management**
- Environment-specific values centralized
- Easy to change configuration without code changes
- Better separation of concerns

## Best Practices

### 1. **Naming Conventions**
- Use UPPER_SNAKE_CASE for constant names
- Group related constants in objects
- Use descriptive names that indicate purpose

### 2. **Organization**
- Group constants by functionality
- Keep related constants together
- Use consistent structure across categories

### 3. **Type Safety**
- Always use `as const` for immutable constant objects
- Define proper TypeScript types when needed
- Use enums for limited value sets

### 4. **Documentation**
- Add JSDoc comments for complex constants
- Document the purpose and usage of each constant group
- Keep examples up to date

## Adding New Constants

1. **Identify the category** (error messages, configuration, etc.)
2. **Add to appropriate constant object**
3. **Use descriptive naming**
4. **Update imports where needed**
5. **Test the changes**

Example:
```typescript
// Add to ERROR_MESSAGES
export const ERROR_MESSAGES = {
  // ... existing messages
  VALIDATION_FAILED: 'Validation failed',
} as const;
```

This centralized constants approach ensures maintainable, consistent, and type-safe code throughout the application.

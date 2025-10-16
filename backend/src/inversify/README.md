# Inversify Dependency Injection Setup

This document explains the Inversify dependency injection implementation in the Restaurant Listing Platform.

## Architecture Overview

The application now uses Inversify for dependency injection, providing:
- **Loose Coupling**: Components depend on abstractions, not concrete implementations
- **Testability**: Easy to mock dependencies for unit testing
- **Maintainability**: Changes to implementations don't affect dependent classes
- **Scalability**: Easy to add new implementations or swap existing ones

## File Structure

```
src/
├── config/
│   └── inversify.config.ts     # Main container configuration
├── inversify/
│   ├── types.ts               # Dependency injection symbols
│   └── README.md              # This documentation
├── repositories/
│   ├── i-restaurant.repo.ts   # Repository interface
│   └── restaurant.repo.ts     # Repository implementation (@injectable)
├── services/
│   ├── i-restaurant-service.ts # Service interface
│   └── restaurant.service.ts   # Service implementation (@injectable)
└── controllers/
    ├── i-restaurant-controller.ts # Controller interface
    └── restaurant.controller.ts   # Controller implementation (@injectable)
```

## Key Components

### 1. Types & Symbols (`inversify/types.ts`)
Defines unique symbols for each dependency:
```typescript
export const TYPES = {
  RestaurantRepository: Symbol.for("RestaurantRepository"),
  RestaurantService: Symbol.for("RestaurantService"),
  RestaurantController: Symbol.for("RestaurantController"),
} as const;
```

### 2. Container Configuration (`config/inversify.config.ts`)
Binds interfaces to implementations:
```typescript
container.bind<IRestaurantRepo>(TYPES.RestaurantRepository).to(RestaurantRepo).inSingletonScope();
container.bind<IRestaurantService>(TYPES.RestaurantService).to(RestaurantService).inSingletonScope();
container.bind<IRestaurantController>(TYPES.RestaurantController).to(RestaurantController).inSingletonScope();
```

### 3. Injectable Classes
All implementations use `@injectable()` decorator and `@inject()` for dependencies:

**Repository:**
```typescript
@injectable()
export class RestaurantRepo extends BaseRepository<Restaurant> implements IRestaurantRepo {
  // Implementation
}
```

**Service:**
```typescript
@injectable()
export class RestaurantService implements IRestaurantService {
  constructor(@inject(TYPES.RestaurantRepository) private readonly repo: IRestaurantRepo) {}
}
```

**Controller:**
```typescript
@injectable()
export class RestaurantController implements IRestaurantController {
  constructor(@inject(TYPES.RestaurantService) private readonly service: IRestaurantService) {}
}
```

## Usage in Routes

Routes get dependencies from the container:
```typescript
import container from '../config/inversify.config.js';
const restaurantController = container.get<IRestaurantController>(TYPES.RestaurantController);
```

## Benefits

### 1. **Dependency Inversion Principle (DIP)**
- High-level modules don't depend on low-level modules
- Both depend on abstractions (interfaces)

### 2. **Single Responsibility Principle (SRP)**
- Each class has one reason to change
- Container handles object creation and wiring

### 3. **Open/Closed Principle (OCP)**
- Easy to extend with new implementations
- No modification of existing code required

### 4. **Interface Segregation Principle (ISP)**
- Interfaces are focused and specific
- Classes only depend on what they need

### 5. **Liskov Substitution Principle (LSP)**
- Any implementation can be substituted
- Container manages the substitutions

## Testing Benefits

With Inversify, testing becomes much easier:

```typescript
// Create test container
const testContainer = new Container();
testContainer.bind<IRestaurantRepo>(TYPES.RestaurantRepository).to(MockRestaurantRepo);
testContainer.bind<IRestaurantService>(TYPES.RestaurantService).to(RestaurantService);
testContainer.bind<IRestaurantController>(TYPES.RestaurantController).to(RestaurantController);

// Get controller with mocked dependencies
const controller = testContainer.get<IRestaurantController>(TYPES.RestaurantController);
```

## Configuration Requirements

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Entry Point
```typescript
import "reflect-metadata"; // Must be imported first
```

## Adding New Dependencies

1. Add symbol to `types.ts`
2. Create interface
3. Create implementation with `@injectable()`
4. Bind in `inversify.config.ts`
5. Inject using `@inject()` where needed

This setup provides a solid foundation for scalable, maintainable, and testable Node.js applications following SOLID principles.

import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import restaurantRoutes from './routes/restaurants.js';
import { API_ENDPOINTS, DATABASE_CONFIG } from './constants/index.js';

const app = express();

app.use(cors({ origin: DATABASE_CONFIG.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(API_ENDPOINTS.RESTAURANTS, restaurantRoutes);

const PORT = process.env.PORT || DATABASE_CONFIG.DEFAULT_PORT;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});  
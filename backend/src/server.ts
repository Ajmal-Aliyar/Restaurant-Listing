import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import restaurantRoutes from './routes/restaurants.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use('/api/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 👍👍👍`);
  });
}).catch((err: Error) => {
  console.error('Unable to connect to the database: ❌❌❌', err);
});  
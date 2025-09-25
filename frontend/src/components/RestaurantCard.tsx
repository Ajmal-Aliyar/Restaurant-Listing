import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { Restaurant } from "../types/Restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#0d0d0d",
        border: "1px solid",
        borderColor: "gray.700",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        color: "white",
        maxWidth: 350,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.7)",
        },
      }}
    >
      {restaurant.image && (
        <CardMedia
          component="img"
          height="180"
          image={restaurant.image}
          alt={restaurant.name}
          style={{ objectFit: "cover" }}
        />
      )}

      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "orange.400" }}
        className="text-orange-400">
          {restaurant.name}
        </Typography>

        <Typography variant="body2" color="gray.300">
          {restaurant.street}, {restaurant.city}, {restaurant.state} -{" "}
          {restaurant.zip}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "orange.300", mt: 1, fontWeight: "500" }}
        >
          📞 {restaurant.contact}
        </Typography>

        {restaurant.createdAt && (
          <Typography
            variant="caption"
            display="block"
            sx={{ color: "gray.500", mt: 1 }}
          >
            Added on {new Date(restaurant.createdAt).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;

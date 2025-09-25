import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Header from "./components/Header";
import RestaurantList from "./components/RestaurantList";
import RestaurantDialog from "./components/RestaurantDialog";
import { getRestaurants } from "./services/api.ts";
import type { Restaurant } from "./types/Restaurant";
import toast, { Toaster } from "react-hot-toast";
import "./styles/App.css";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<
    Restaurant | undefined
  >(undefined);

  const fetchRestaurants = async () => {
    try {
      const { data } = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
      toast.error("Failed to fetch restaurants.");
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleAdd = () => {
    setEditingRestaurant(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSave = async () => {
    await fetchRestaurants();
  };

  return (
    <div className="w-screen h-screen bg-[#060606]">
    <Container maxWidth="md" className="app-container bg-[#0d0d0d] h-screen border-x border-gray-700 ">
      <Toaster />
      <Header onAddClick={handleAdd} />
      <RestaurantList restaurants={restaurants} onEdit={handleEdit} />
      <RestaurantDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        restaurant={editingRestaurant}
        onSave={handleSave}
      />
    </Container>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { deleteRestaurant } from "../services/api";
import type { Restaurant } from "../types/Restaurant";
import toast from "react-hot-toast";

interface RestaurantListProps {
  restaurants: Restaurant[];
  onEdit: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onEdit,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [localRestaurants, setLocalRestaurants] =
    useState<Restaurant[]>(restaurants);

  React.useEffect(() => {
    setLocalRestaurants(restaurants);
  }, [restaurants]);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteId !== null) {
        await deleteRestaurant(deleteId);
        setLocalRestaurants((prev) => prev.filter((r) => r.id !== deleteId));
        setDeleteId(null);
        setConfirmOpen(false);
        toast.success(" Restaurant deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete restaurant:", error);
      toast.error(" Failed to delete restaurant.");
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 ">
      {localRestaurants.length > 0 ? (
        <ul className="divide-y divide-gray-300 bg-white/90 shadow rounded-xl overflow-hidden">
          {localRestaurants.map((resto) => (
            <li
              key={resto.id}
              className="flex justify-between items-start p-4 hover:bg-gray-50 transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#efa503]">
                  {resto.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Address:</span>{" "}
                  {`${resto.street || ""}, ${resto.city || ""}, ${
                    resto.state || ""
                  } ${resto.zip || ""}`}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-medium">Contact:</span> {resto.contact}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => onEdit(resto)}
                  className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                >
                  <Edit fontSize="small" />
                </button>
                <button
                  onClick={() =>
                    resto.id !== null &&
                    resto.id !== undefined &&
                    handleDeleteClick(resto.id)
                  }
                  className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                >
                  <Delete fontSize="small" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-8 bg-white shadow rounded-xl">
          🍽️ No restaurants found. Add a new one to get started!
        </p>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Are you sure you want to delete this restaurant?
            </h2>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;

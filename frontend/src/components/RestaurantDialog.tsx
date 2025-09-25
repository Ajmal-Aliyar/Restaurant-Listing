import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { addRestaurant, updateRestaurant } from "../services/api";
import type { Restaurant } from "../types/Restaurant";
import "../styles/RestaurantDialog.css";
import toast from "react-hot-toast";
import axios from "axios";

interface RestaurantDialogProps {
  open: boolean;
  onClose: () => void;
  restaurant?: Restaurant;
  onSave: () => void;
}

const RestaurantDialog: React.FC<RestaurantDialogProps> = React.memo(
  function RestaurantDialog({ open, onClose, restaurant, onSave }) {

    const initialForm = React.useMemo(
      () =>
        restaurant
          ? { ...restaurant }
          : { id: null, name: "", street: "", city: "", state: "", zip: "", contact: "" },
      [restaurant]
    );
    const [formData, setFormData] = useState<Restaurant>(initialForm);
    const [errors, setErrors] = useState({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      contact: "",
    });

    useEffect(() => {
      setFormData(initialForm);
      setErrors({ name: "", street: "", city: "", state: "", zip: "", contact: "" });
    }, [initialForm, open]);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setErrors((prev) => ({ ...prev, [name]: "" }));
      if (["street", "city", "state", "zip", "name"].includes(name)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      } else if (name === "contact") {
        if (value === "" || /^\d+$/.test(value)) {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
      }
    }, []);

    const validateForm = React.useCallback(() => {
      let isValid = true;
      const newErrors = { name: "", street: "", city: "", state: "", zip: "", contact: "" };
      if (!formData.name.trim()) {
        newErrors.name = "Name is required.";
        isValid = false;
      }
      if (!formData.street.trim()) {
        newErrors.street = "Street is required.";
        isValid = false;
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required.";
        isValid = false;
      }
      if (!formData.state.trim()) {
        newErrors.state = "State is required.";
        isValid = false;
      }
      if(!formData.zip.trim() || !/^\d{5,6}$/.test(formData.zip)) {
        newErrors.zip = "Enter a valid ZIP code.";
        isValid = false;
      }
      if (formData.contact.trim().length !== 10) {
        newErrors.contact = "Enter 10 digits contact number.";
        isValid = false;
      } else if (!/^\d+$/.test(formData.contact)) {
        newErrors.contact = "Contact must contain only numbers.";
        isValid = false;
      }
      setErrors(newErrors);
      return isValid;
    }, [formData]);

    const handleSubmit = React.useCallback(async () => {
      if (!validateForm()) {
        toast.error("Please correct the form errors.");
        return;
      }
      try {
        if (formData.id && restaurant) {
          await updateRestaurant(formData.id, formData);
          toast.success("Restaurant updated successfully!");
        } else {
          await addRestaurant(formData);
          toast.success("New Restaurant Added successfully!");
        }
        setFormData({ id: null, name: "", street: "", city: "", state: "", zip: "", contact: "" });
        onSave();
        onClose();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Failed to save restaurant:", error);
          toast.error(error.response?.data.error || "Failed to save restaurant.");
        } else {
          console.error("Failed to save restaurant:", error);
          toast.error("Failed to save restaurant.");
        }
      }
    }, [formData, restaurant, validateForm, onSave, onClose]);

    return (
      <Dialog open={open} onClose={onClose} className="restaurant-dialog">
        <DialogTitle sx={{ fontWeight: 600, fontSize: 22, letterSpacing: 0.5, textAlign: 'center' }}>
          {restaurant ? "Edit Restaurant" : "Add New Restaurant"}
        </DialogTitle>
        <DialogContent sx={{ minWidth: 400, paddingTop: 2 }}>
          <div style={{ marginBottom: 18 }}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Restaurant Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              inputProps={{ style: { fontWeight: 500, fontSize: 16 } }}
            />
          </div>
          <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 8, color: '#555' }}>Address</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <TextField
              margin="dense"
              name="street"
              label="Street"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.street}
              onChange={handleChange}
              error={!!errors.street}
              helperText={errors.street}
            />
            <TextField
              margin="dense"
              name="city"
              label="City"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
            />
            <TextField
              margin="dense"
              name="state"
              label="State"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
            />
            <TextField
              margin="dense"
              name="zip"
              label="ZIP Code"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.zip}
              onChange={handleChange}
              error={!!errors.zip}
              helperText={errors.zip}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <TextField
              margin="dense"
              name="contact"
              label="Contact Number"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.contact}
              onChange={handleChange}
              error={!!errors.contact}
              helperText={errors.contact}
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '16px 24px' }}>
          <Button variant="outlined" className="" onClick={onClose} sx={{ minWidth: 100, borderColor: '#efa503', color: '#efa503', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button variant="contained" className="bg-gradient-to-b from-[#daba06] to-[#efa503]" onClick={handleSubmit} sx={{ minWidth: 120, fontWeight: 600 }}>
            {restaurant ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default RestaurantDialog;

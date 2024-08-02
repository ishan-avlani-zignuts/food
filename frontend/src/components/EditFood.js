import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import axios from "axios";

const EditFood = ({ foodId, onClose }) => {
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/getfood/${foodId}`
        );
        setFood(response.data);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    if (foodId) {
      fetchFood();
    }
  }, [foodId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFood((prevFood) => ({ ...prevFood, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", food._id);
      formData.append("dish", food.dish);
      formData.append("desc", food.desc);
      formData.append("price", food.price);
      formData.append("rating", food.rating);
      if (food.imgdata) {
        formData.append("imgdata", food.imgdata);
      }

      await axios.post("http://localhost:5000/api/admin/editfood", formData);
      alert("Food updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

  if (!food) return null;

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          padding: "20px",
          width: "400px",
          margin: "auto",
          backgroundColor: "white",
          marginTop: "100px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            name="dish"
            label="Dish Name"
            value={food.dish || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="desc"
            label="Details"
            value={food.desc || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Price"
            value={food.price || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="rating"
            label="Rating"
            value={food.rating || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditFood;

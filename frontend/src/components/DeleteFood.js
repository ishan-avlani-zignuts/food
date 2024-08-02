import React, { useState } from "react";
import axios from "axios";

const DeleteFood = ({ foodId, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/admin/deletefood", {
        id: foodId,
      });
      alert("Food deleted successfully");
      onClose(); 
    } catch (error) {
      console.error("Error deleting food:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete this food item?</h2>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Food"}
      </button>
    </div>
  );
};

export default DeleteFood;

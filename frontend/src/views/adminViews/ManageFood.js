import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { tokens } from "../../theme";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditFood from "../../components/EditFood";
import DeleteFood from "../../components/DeleteFood";

const ManageFood = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "dish", headerName: "Dish Name", width: 150 },
    { field: "imgdata", headerName: "Image", width: 200 },
    { field: "desc", headerName: "Details", width: 200 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "rating", headerName: "Rating", width: 250 },
    {
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => {
              setSelectedFood(params.row.id);
              setShowEditModal(true);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedFood(params.row.id);
              setShowDeleteModal(true);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getfood"
        );
        const formattedData = response.data.map((food) => ({
          id: food._id,
          ...food,
        }));
        setContacts(formattedData);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <Box m="20px">
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={contacts}
          columns={columns}
          loading={loading}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
        />
      </Box>
      {showEditModal && (
        <EditFood
          foodId={selectedFood}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteFood
          foodId={selectedFood}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </Box>
  );
};

export default ManageFood;

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/Headers";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("dish", values.dish);
    formData.append("imgdata", values.imgdata);
    formData.append("desc", values.desc);
    formData.append("price", values.price);
    formData.append("rating", values.rating);

    try {
      const url = "http://localhost:5000/api/admin/addfood";
      const { data: res } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from server:",res);
      navigate("/addfood");
      console.log("Food Added Successfully");
    } catch (error) {
      console.error("Error during signup:", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="Add Food" subtitle="Add a new food to the menu" />

      <Formik
        initialValues={{
          dish: "",
          imgdata: null,
          desc: "",
          price: "",
          rating: "",
        }}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Dish Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dish}
                name="dish"
                error={!!touched.dish && !!errors.dish}
                helperText={touched.dish && errors.dish}
                sx={{ gridColumn: "span 2" }}
              />
              <input
                type="file"
                onChange={(e) =>
                  setFieldValue("imgdata", e.currentTarget.files[0])
                }
                name="imgdata"
                style={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Details"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.desc}
                name="desc"
                error={!!touched.desc && !!errors.desc}
                helperText={touched.desc && errors.desc}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Ratings"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rating}
                name="rating"
                error={!!touched.rating && !!errors.rating}
                helperText={touched.rating && errors.rating}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                Add Food
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Add;

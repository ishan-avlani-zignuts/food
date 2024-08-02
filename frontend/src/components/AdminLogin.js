import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";

const AdminLogin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "admin@gmail.com" && data.password === "Admin@123") {
      try {
        const url = "http://localhost:5000/api/auth";
        const { data: res } = await axios.post(url, data);
        localStorage.setItem("admin", res.data);
        window.location = "/addfood";
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#141B2D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          width: "900px",
          height: "500px",
          display: "flex",
          borderRadius: "10px",
          boxShadow:
            "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
        }}
      >
        <Box
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <Typography
              variant="h1"
              style={{ fontSize: "40px", marginBottom: "10px" }}
            >
              Admin Login
            </Typography>
            <TextField
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              sx={{
                marginTop: "10px",
                "& .MuiInputBase-input": {
                  color: "black", 
                },
                "& .MuiInputLabel-root": {
                  color: "black", 
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "black", 
                },
                width: "370px",
                borderRadius: "10px",
                backgroundColor: "#edf5f3",
                margin: "5px 0",
                fontSize: "14px",
              }}
            />
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              sx={{
                marginTop: "10px",
                "& .MuiInputBase-input": {
                  color: "black", 
                },
                "& .MuiInputLabel-root": {
                  color: "black", 
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "black", 
                },
                width: "370px",
                borderRadius: "10px",
                backgroundColor: "#edf5f3",
                margin: "5px 0",
                fontSize: "14px",
              }}
            />
            {error && (
              <Box
                style={{
                  width: "370px",
                  margin: "5px 0",
                  fontSize: "14px",
                  backgroundColor: "#f34646",
                  color: "white",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                {error}
              </Box>
            )}
            <Button
              type="submit"
              style={{
                border: "none",
                outline: "none",
                padding: "12px 0",
                backgroundColor: "#3bb19b",
                color: "white",
                borderRadius: "20px",
                width: "180px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                margin: "10px",
              }}
            >
              Sign In
            </Button>
          </form>
        </Box>
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#3bb19b",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Typography
            variant="h1"
            style={{
              marginTop: "0",
              color: "white",
              fontSize: "40px",
              alignSelf: "center",
            }}
          >
            New Here?
          </Typography>
          <Link to="/signup">
            <Button
              type="button"
              style={{
                border: "none",
                outline: "none",
                padding: "12px 0",
                backgroundColor: "white",
                borderRadius: "20px",
                width: "180px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                margin: "10px",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLogin;

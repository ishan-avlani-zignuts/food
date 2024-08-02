import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./views/userViews/Home";
import CartDetails from "./components/CartDetails";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./theme";
import Add from "./views/adminViews/NewFood";
import ManageFood from "./views/adminViews/ManageFood";
import Hero from "./views/Hero";
import SidebarLayout from "./layouts/SidebarLayout";
import AdminLogin from "./components/AdminLogin";
import UserLogin from "./components/UserLogin";
import UserSidebarLayout from "./layouts/UserSidebarLayout";
import Example from "./views/userViews/OrdersGraph";
import SuccessPage from "./views/userViews/Success";
import ViewPastOrders from "./views/userViews/ViewPastOrders";
import ManageProfile from "./views/userViews/ManageProfile";
import AdminDashboard from "./views/adminViews/AdminDashboard";
import PieChart from "./components/OrdersChartData";
import { useState } from "react";

function App() {
  const user = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");
  const [theme] = useMode();
  const [cartLength , setCartLength] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" exact element={<Hero />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/adminlogin" exact element={<AdminLogin />} />
        <Route path="/userlogin" exact element={<UserLogin />} />

        <Route path="/" element={<SidebarLayout />}>
          <Route
            path="/addfood"
            element={admin ? <Add /> : <Navigate replace to="/adminlogin" />}
          />
          <Route
            path="/managefood"
            element={
              admin ? <ManageFood /> : <Navigate replace to="/adminlogin" />
            }
          />
          <Route
            path="/admindashboard"
            element={
              admin ? <AdminDashboard /> : <Navigate replace to="/adminlogin" />
            }
          />
        </Route>
        <Route path="/" element={<UserSidebarLayout />}>
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate replace to="/userlogin" />}
          />
          <Route
            path="/cartpage"
            element={
              user ? (
                <CartDetails onCartChange={setCartLength} />
              ) : (
                <Navigate replace to="/userlogin" />
              )
            }
          />
          <Route path="/ordergraph" element={<Example />} />
          <Route
            path="/success"
            element={
              user ? <SuccessPage /> : <Navigate replace to="/userlogin" />
            }
          />
          <Route
            path="/vieworders"
            element={
              user ? <ViewPastOrders /> : <Navigate replace to="/userlogin" />
            }
          />
          <Route
            path="/manageprofile"
            element={
              user ? <ManageProfile /> : <Navigate replace to="/userlogin" />
            }
          />
          <Route
            path="/pie"
            element={user ? <PieChart /> : <Navigate replace to="/userlogin" />}
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

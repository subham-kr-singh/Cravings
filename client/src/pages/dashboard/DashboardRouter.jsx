import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CustomerDashboard from "./UserDashboard";
import RestaurantDashboard from "./RestaurantDashboard";
import RiderDashboard from "./RiderDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardRouter = () => {
  const { user, isLogin } = useAuth();

  if (!isLogin || !user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.userType) {
    case "customer":
      return <CustomerDashboard />;
    case "restaurant":
      return <RestaurantDashboard />;
    case "rider":
      return <RiderDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default DashboardRouter;

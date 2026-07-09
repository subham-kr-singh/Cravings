import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import CustomerDashboard from "./pages/dashboard/UserDashboard";
import RestaurantDashboard from "./pages/dashboard/RestaurantDashboard";
import RiderDashboard from "./pages/dashboard/RiderDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register/:userType" element={<Register />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route
            path="/restaurant-dashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

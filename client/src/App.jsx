import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/dashboard/UserDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          {/* Dashboard Route */}
          <Route path="user/dashboard" element={<UserDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

import { useLocation, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

function App() {
  // const [showLogin, setShowLogin] = useState(false);
  const { showLogin } = useAppContext();
  const isOwnersPath = useLocation().pathname.startsWith("/owner");
  return (
    <div className="text-sm">
      <Toaster />
      {showLogin && <Login />}
      {!isOwnersPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/car-details/:id" element={<CarDetails />}></Route>
        <Route path="/cars" element={<Cars />}></Route>
        <Route path="/my-bookings" element={<MyBookings />}></Route>
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isOwnersPath && <Footer />}
    </div>
  );
}

export default App;

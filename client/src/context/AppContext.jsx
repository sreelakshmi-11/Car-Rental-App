import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");

      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
        console.log(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const fetchOwnerbookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
      if (data.success) {
        setBookings(data.bookings);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //function to fetch all cars from server
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  //useEffect for retrieving token from localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    fetchCars();
  }, [token]);
  //useEffect to fetch user when token is available

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    }
  }, [token]);
  //function to logout the user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorisation"] = null;
    toast.success("Logged out successfully");
  };
  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    logout,
    showLogin,
    setShowLogin,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    isOwner,
    setIsOwner,
    cars,
    fetchUser,
    fetchCars,
    changeRole,
    fetchOwnerbookings,
    bookings,
    setBookings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

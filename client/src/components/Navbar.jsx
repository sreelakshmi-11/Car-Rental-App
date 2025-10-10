import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const Navbar = () => {
  const location = useLocation();
  const { user, logout, isOwner, axios, setIsOwner, changeRole } =
    useAppContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setShowLogin } = useAppContext();

  return (
    <div
      className={`flex justify-between items-center px-30 py-4 text-gray-600 border-b  border-borderColor relative transition-all  ${
        location.pathname === "/" && "bg-light"
      } `}
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>
      <div
        className={`flex  gap-4 items-center transition-all duration-300 z-50 font-bold
             ${location.pathname === "/" ? "bg-light" : "bg-white"} ${
          open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
        } 
        `}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}
       
        <div className="flex items-center gap-6">
          <button
            className="cursor-pointer"
            onClick={() => {
              isOwner ? navigate("/owner") : changeRole();
            }}
          >
            {isOwner ? "Dashboard" : "List cars"}
          </button>
          <button
            className="cursor-pointer ml-4 bg-primary text-white py-2 px-8 rounded-[10px] hover:bg-primary-dull"
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
      <button className="sm:hidden cursor-pointer">
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          onClick={() => setOpen(!open)}
        />
      </button>
    </div>
  );
};

export default Navbar;

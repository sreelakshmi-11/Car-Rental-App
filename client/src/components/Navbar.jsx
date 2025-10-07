import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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
        <div className="flex gap-4 border border-borderColor px-4 rounded-full max-w-56">
          <input
            type="text"
            placeholder="Search products"
            className="py-1.5 w-full bg-transparent outline-none  placeholder-gray-500"
          />
          <img src={assets.search_icon} alt="search" />
        </div>
        <div className="flex items-center gap-6">
          <button className="cursor-pointer" onClick={() => navigate("/owner")}>
            Dashboard
          </button>
          <button
            className="cursor-pointer ml-4 bg-primary text-white py-2 px-8 rounded-[10px] hover:bg-primary-dull"
            onClick={() => setShowLogin(true)}
          >
            login
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

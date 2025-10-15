import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const Navbar = () => {
  const location = useLocation();
  const { user, logout, isOwner, changeRole } = useAppContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setShowLogin } = useAppContext();
  const [showList, setShowList] = useState(false);

  return (
    <div>
      <div
        className={`flex justify-between items-center px-30 py-4 text-gray-600 border-b  border-borderColor relative transition-all hidden md:flex `}
      >
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-8" />
        </Link>
        <div
          className={`hidden sm:flex  gap-4 items-center transition-all duration-300 z-50 font-bold
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
      {/* mobile version */}
      <div className="md:hidden flex flex-col">
        <div className="flex justify-between items-center p-4">
          <Link to="/">
            <img src={assets.logo} alt="logo" className="h-6" />
          </Link>
          <img src={assets.menu_icon} onClick={() => setShowList(!showList)} />
        </div>
        {showList && (
          <div className="flex flex-col justify-end items-end gap-3 p-3 ">
            {menuLinks.map((item, i) => (
              <div
                key={i}
                className="border-b border-borderColor w-full text-right"
              >
                <Link to={item.path}>
                  <div>{item.name}</div>
                </Link>
              </div>
            ))}
            <button
              onClick={() => {
                setShowList(false);
                isOwner ? navigate("/owner") : changeRole();
              }}
              className="text-right border-b border-borderColor w-full"
            >
              {isOwner ? "Dashboard" : "List cars"}
            </button>

            <button
              onClick={() => {
                setShowList(false);
                user ? logout() : setShowLogin(true);
              }}
              className="text-right w-[100px] ml-auto border-b border-borderColor w-full"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

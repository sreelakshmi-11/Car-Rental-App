import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const { user } = useAppContext();
  return (
    <div className=" px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor transition-all flex items-center justify-between">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>
      <p>Welcome,{user?.name || "owner"}</p>
    </div>
  );
};

export default NavbarOwner;

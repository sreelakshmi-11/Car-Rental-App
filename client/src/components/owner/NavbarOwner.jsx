import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";

const NavbarOwner = () => {
  const user = dummyUserData;
  return (
    <div className=" px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor transition-all">
      <Link to="/" className="flex items-center justify-between">
        <img src={assets.logo} alt="logo" className="h-8" />
        <p>Welcome,{user.name || "owner"}</p>
      </Link>
    </div>
  );
};

export default NavbarOwner;

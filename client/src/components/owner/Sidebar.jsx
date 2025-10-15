import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { useLocation, NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");

  const UpdateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative md:min-h-screen h-[100px] flex-row md:flex-row flex-col md:max-w-60 items-center pt-8  w-full sm:border sm:border-borderColor text-sm">
      <div className=" hidden md:flex md:flex-col ">
        <div className="group relative">
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : user?.image ||
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
              }
              alt=""
              className="w-14 h-14 rounded-full object-cover mx-auto"
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />

            <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
              <img src={assets.edit_icon} alt="" />
            </div>
          </label>
        </div>
        {image && (
          <button
            className=" absolute top-0 right-0 flex p-2  gap-1 bg-primary/10 text-primary cursor-pointer"
            onClick={UpdateImage}
          >
            Save <img src={assets.check_icon} width={13} alt="" />
          </button>
        )}
        <p className="mt-2 text-base max-md-hidden text-center">{user?.name}</p>
      </div>
      <div className="w-full flex justify-evenly md:flex-col ">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex flex-col sm:flex-row items-center gap-2 py-3 pl-4 md:first:mt-6 ${
              link.path === location.pathname
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt=""
            />
            <span>{link.name}</span>
            <div
              className={`${
                link.path === location.pathname && "md:bg-primary"
              } md:w-1.5 md:h-8 md:rounded-1 md:right-0 md:absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

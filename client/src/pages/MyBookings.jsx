import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Title from "../components/Title";

const MyBookings = () => {
  const { user, currency, axios, setShowLogin, navigate } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
        toast.success(data.message);
      } else {
        setShowLogin(true);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) fetchBookings();
    else {
      setShowLogin(true);
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-4 mt-6 px-20 min-h-[60vh]">
      <Title title="My Bookings" subTitle="View and manage your car bookings" />
      <div className="flex flex-col gap-4">
        {bookings.map((item, i) => (
          <div
            key={i}
            className="grid md:grid-cols-3 border border-gray-400 p-5 rounded-lg gap-4"
          >
            <div className="flex gap-4 items-center justify-center ">
              <div key={item._id}>
                <img
                  src={item.image}
                  className="max-h-[150px] object-cover object-fit"
                />
                <h1>
                  {item.brand} {item.model}
                </h1>
                <p className="text-gray-400">
                  {item.year}.{item.category}.{item.location}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <p className="bg-gray-200 p-2 rounded-lg">Booking#{i + 1}</p>
                <p
                  className={`${
                    item.status === "confirmed" ? "bg-green-200" : "bg-red-200"
                  } p-2 rounded-lg`}
                >
                  {item.status}
                </p>
              </div>
              <div>
                <p className="flex gap-2">
                  <img src={assets.calendar_icon_colored} />
                  Rental Period
                </p>
                <span className="ml-[10px]">
                  {item.pickupDate.split("T")[0]} to{" "}
                  {item.returnDate.split("T")[0]}
                </span>
              </div>
              <div>
                <p className="flex gap-2">
                  <img src={assets.location_icon_colored} />
                  Pickup Location
                </p>
                <span>{item.pickupLocation}</span>
              </div>
              <div>
                <p className="flex gap-2">
                  <img src={assets.location_icon_colored} />
                  Return Location
                </p>
                <span>{item.returnLocation}</span>
              </div>
            </div>

            <div className="flex flex-col md:items-end">
              <p>Total price</p>
              <span className="text-primary font-bold text-2xl">
                {currency} {item.price}
              </span>
              <p>Booked on {item.createdAt.split("T")[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;

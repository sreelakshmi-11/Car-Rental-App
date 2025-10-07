import React, { useEffect, useState } from "react";
import { assets, dummyMyBookingsData } from "../assets/assets";

const MyBookings = () => {
  const [bookings, setbookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;
  const fetchBookings = () => {
    setbookings(dummyMyBookingsData);
  };
  useEffect(() => {
    fetchBookings();
  });

  return (
    <div className="flex flex-col gap-4 mt-6 px-20">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-4xl">My Bookings</h1>
        <p className="text-gray-400">View and manage your car bookings</p>
      </div>
      <div className="flex flex-col gap-4">
        {bookings.map((item, i) => (
          <div className="grid grid-cols-3 border border-gray-400 p-5 rounded-lg gap-4">
            <div className="flex gap-4 ">
              <div key={item._id}>
                <img
                  src={item.car.image}
                  className=" max-h-[150px] object-cover object-fit"
                />
                <h1>
                  {item.car.brand} {item.car.model}
                </h1>
                <p className="text-gray-400">
                  {item.car.year}.{item.car.category}.{item.car.location}
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
                  {item.pickupDate.split("T")[0].replaceAll("-", "/")} -
                  {item.returnDate.split("T")[0].replaceAll("-", "/")}
                </span>
              </div>
              <div>
                <p className="flex gap-2">
                  <img src={assets.location_icon_colored} />
                  Pickup Location
                </p>
                <span>{item.car.location}</span>
              </div>
              <div>
                <p className="flex gap-2">
                  <img src={assets.location_icon_colored} />
                  Return Location
                </p>
                <span>{item.car.location}</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p>Total price</p>
              <span className="text-primary font-bold text-2xl">
                {currency} {item.car.pricePerDay}
              </span>
              <p>Booked on {item.car.createdAt.split("T")[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;

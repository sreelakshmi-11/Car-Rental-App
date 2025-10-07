import React, { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import Title from "../../components/Title";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;
  const fetchOwnerbookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchOwnerbookings();
  });

  return (
    <div className=" flex flex-col p-10 gap-4">
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings,approve or cancel requests,and manage booking statuses"
      />
      <div className="mt-10">
        <table className="border border-gray-400">
          <thead>
            <tr className="p-5 border border-gray-400">
              <th className="p-5">Car</th>
              <th className="p-5">Date Range</th>
              <th className="p-5">Total</th>
              <th className="p-5">Payment</th>
              <th className="p-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <tr key={i} className="p-5 border border-gray-400">
                <td className="p-5">
                  <div className="flex gap-3">
                    <img
                      src={booking.car.image}
                      alt="car"
                      className="w-10 rounded-lg w-14"
                    />
                    <div className="flex gap-2 text-gray-500 items-center justify-center">
                      <span>{booking.car.brand}</span>
                      <span>{booking.car.model}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2 text-gray-500">
                        <span>{booking.brand}</span>
                        <span>{booking.model}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <span>
                    {new Date(
                      booking.pickupDate.split("T")[0]
                    ).toLocaleDateString()}
                    -
                    {new Date(
                      booking.returnDate.split("T")[0]
                    ).toLocaleDateString()}
                  </span>
                </td>
                <td className="p-5">
                  {currency}
                  {booking.price}
                </td>
                <td className="p-3 max-md:hidden">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    offline
                  </span>
                </td>
                <td className="p-3">
                  {booking.status === "pending" ? (
                    <select
                      value={booking.status}
                      className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-500"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;

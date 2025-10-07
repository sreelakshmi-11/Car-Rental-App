import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/Title";

const ManageCars = () => {
  const [cars, setcars] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;
  const fetchOwnerCars = async () => {
    setcars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);
  return (
    <div className="p-10 flex flex-col gap-6">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform"
      />
      <div>
        <table className="border border-gray-400">
          <thead>
            <tr className="p-5 border border-gray-400">
              <th className="p-5">Car</th>
              <th className="p-5">Category</th>
              <th className="p-5">Price</th>
              <th className="p-5">Status</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, i) => (
              <tr key={i} className="p-5 border border-gray-400">
                <td className="p-5">
                  <div className="flex gap-3">
                    <img src={car.image} alt="car" className="w-10" />
                    <div className="flex flex-col">
                      <div className="flex gap-2 text-gray-500">
                        <span>{car.brand}</span>
                        <span>{car.model}</span>
                      </div>
                      <div className="flex text-gray-500 text-[12px] gap-2">
                        <span>{car.seating_capacity} seats</span> .
                        <span>{car.transmission}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-5">{car.category}</td>
                <td className="p-5">
                  {currency}
                  {car.pricePerDay}/day
                </td>
                <td>
                  <span
                    className={`rounded-lg px-3 py-2 text-xs ${
                      car.isAvaliable
                        ? "text-green-500 bg-green-100 "
                        : "text-red-500 bg-red-100"
                    }`}
                  >
                    {car.isAvaliable ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex gap-3">
                    <img
                      src={
                        !car.isAvaliable
                          ? assets.eye_icon
                          : assets.eye_close_icon
                      }
                      alt=""
                    />
                    <img src={assets.delete_icon} alt="" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;

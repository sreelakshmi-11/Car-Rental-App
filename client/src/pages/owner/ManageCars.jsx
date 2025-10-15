import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setcars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        toast.success(data.message);
        setcars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-cars", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteCars = async (carId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this car?"
      );
      if (!confirm) return;
      const { data } = await axios.delete("/api/owner/delete-car", {
        data: { carId },
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);
  console.log(cars);
  return (
    <div className="mx-auto mt-10 flex flex-col gap-6 p-10">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform"
      />
      <div className="flex flex-col mx-auto overflow-x-scroll">
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
                    <img src={car.image} alt="car" className=" w-6 md:w-10" />
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
                <td className="p-2 md:p-5">{car.category}</td>
                <td className="p-2 md:p-5">
                  {currency}
                  {car.pricePerDay}/day
                </td>
                <td>
                  <span
                    className={`rounded-lg px-3 py-2 text-xs ${
                      car.isAvailable
                        ? "text-green-500 bg-green-100 "
                        : "text-red-500 bg-red-100"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className=" p-2 md:p-5">
                  <div className="flex gap-1 md:gap-3">
                    <img
                      src={
                        !car.isAvailable
                          ? assets.eye_icon
                          : assets.eye_close_icon
                      }
                      alt=""
                      onClick={() => toggleAvailability(car._id)}
                    />
                    <img
                      src={assets.delete_icon}
                      alt=""
                      onClick={() => deleteCars(car._id)}
                    />
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

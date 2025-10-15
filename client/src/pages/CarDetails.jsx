import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  const {
    cars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    pickupLocation,
    setPickupLocation,
    returnLocation,
    setReturnLocation,
  } = useAppContext();
  useEffect(() => {
    setCar(cars?.find((car) => car._id === id));
  }, [cars, id]);

  const handleSubmitForm = async (e) => {
    console.log("triggered");
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
        pickupLocation,
        returnLocation,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>
      <div className="flex gap-8 lg:gap-12 mb-6">
        <div className="w-3/4 relative">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="flex flex-col gap-3 ">
            <div>
              <h1 className="text-2xl font-bold">
                {car.brand} {car.model}
              </h1>
            </div>
            <div>
              <p>
                {car.year} . {car.category}
              </p>
            </div>
            <hr />
            <div className="flex gap-4 w-full ">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity}` },
                { icon: assets.fuel_icon, text: `${car.fuel_type}` },
                { icon: assets.car_icon, text: `${car.transmission}` },
                { icon: assets.location_icon, text: `${car.location}` },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="bg-gray-200 px-6 py-4 w-full h-20 rounded-[10px] flex flex-col items-center justify-center gap-1 text-[15px]"
                >
                  <img src={icon} alt="icon" className="w-6 h-6" />
                  {text}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <h1 className="font-bold text-2xl">Description</h1>
              <div>{car.description}</div>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <h1 className="font-bold text-2xl">Features</h1>
              <div className="grid grid-cols-2">
                {[
                  "Leather Seats",
                  "Panoramic Sunproof",
                  "Wireless Charging",
                  "360 Camera",
                ].map((feature) => (
                  <ul key={feature} className="flex gap-2">
                    <li>
                      <img src={assets.check_icon} />
                    </li>{" "}
                    {feature}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 px-6 shadow-lg h-[600px]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-[26px]">
              {currency}
              {car.pricePerDay}
            </span>
            <span className="text-sm text-gray-500">per day</span>
          </div>
          <hr />
          <form
            onSubmit={handleSubmitForm}
            className="flex flex-col gap-6 mt-4"
          >
            <div className="flex flex-col gap-2">
              <label>Pickup date</label>
              <input
                type="date"
                placeholder="Pickup Date"
                className="border px-3 py-2 rounded-md"
                required
                value={pickupDate || ""}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Return date</label>
              <input
                type="date"
                placeholder="Return Date"
                className="border px-3 py-2 rounded-md"
                required
                min={pickupDate}
                value={returnDate || ""}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label> Pickup Location</label>
              <input
                type="text"
                placeholder="pickup Location"
                className="border px-3 py-2 rounded-md"
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label> return Location</label>
              <input
                type="text"
                placeholder="return Location"
                className="border px-3 py-2 rounded-md"
                required
                value={returnLocation}
                onChange={(e) => setReturnLocation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="border px-3 py-2 rounded-md bg-primary text-white hover:bg-primary-dull"
            >
              Book Now
            </button>
            <p className="text-sm text-gray-500">
              No credit card required to reserve
            </p>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;

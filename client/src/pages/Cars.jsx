import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const Cars = () => {
  const [searchparams] = useSearchParams();
  const pickupLocation = searchparams.get("pickupLocation");
  const pickupDate = searchparams.get("pickupDate");
  const returnDate = searchparams.get("returnDate");

  const { cars, axios } = useAppContext();
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const applyFilter = async () => {
    if (input === "") {
      setFilteredData(cars);
      return null;
    }
    const filtered = cars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };
  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        setFilteredData(data.availableCars);
        if (data.availableCars.length === 0) {
          toast.success("No available cars");
        }
        return null;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    isSearchData && searchCarAvailability();
  }, []);

  useEffect(() => {
    cars?.length > 0 && !isSearchData && applyFilter();
  }, [input, cars]);
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center  px-10 py-16 gap-4 bg-gray-100">
        <h1 className="font-bold text-4xl">Available Cars</h1>
        <p className="text-gray-500">
          Browse our selection of premium vehicles available for our next
          adventure
        </p>
        <div className="flex gap-2 border border-gray-300 rounded-full w-[400px] px-4">
          <img src={assets.search_icon} alt="search" />
          <input
            type="text"
            value={input}
            placeholder="Search by make,model or feature"
            className="px-4 py-2 w-full focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
          />
          <img src={assets.filter_icon} alt="filter" />
        </div>
      </div>

      <div className="max-w-7xl m-auto px-4 sm:px-6 lg:px-8 mt-12">
        <p className="text-gray-600">Showing {filteredData.length} cars</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredData.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;

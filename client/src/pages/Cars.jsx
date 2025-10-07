import React, { useState } from "react";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";

const Cars = () => {
  const [filteredData, setFilteredData] = useState(dummyCarData);
  const [searchItem, setSearchItem] = useState("");
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.trim();
      setSearchItem(value);
      if (searchItem === "") {
        setFilteredData(dummyCarData);
      }
      const data = dummyCarData.filter((car) =>
        `${car.brand} ${car.model} ${car.features}`
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setFilteredData(data);
    }
  };
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
            type="search"
            placeholder="Search by make,model or feature"
            className="px-4 py-2 w-full focus:outline-none"
            onKeyDown={handleSearch}
          />
          <img src={assets.filter_icon} alt="filter" />
        </div>
      </div>

      <div className="max-w-7xl m-auto px-4 sm:px-6 lg:px-8 mt-12">
        {!filteredData === 0 && searchItem && (
          <p className="text-gray-600">
            Showing results for{" "}
            <span className="font-bold font-[24px]">{searchItem}</span>
          </p>
        )}
        {filteredData.length === 0 ? (
          <p className="text-gray-600 mt-4 text-center text-[24px]">
            No Results Found with{" "}
            <span className="font-bold font-[24px]">{searchItem}</span>
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {filteredData.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;

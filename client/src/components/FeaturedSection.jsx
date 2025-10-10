import React from "react";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
  const { cars, navigate } = useAppContext();
  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div>
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {cars?.slice(0, 6).map((car) => (
          <div key={car._id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex  items-center gap-2 text-white mt-12 bg-primary py-3 px-6 rounded-full"
      >
        Explore all Cars
        <img src={assets.arrow_icon} alt="arrow" className="text-white" />
      </button>
    </div>
  );
};

export default FeaturedSection;

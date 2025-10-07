import React, { useState } from "react";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const [image, setImage] = useState("");
  const currency = import.meta.env.VITE_CURRENCY;

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(car);
  };
  return (
    <div className=" flex flex-col gap-6 p-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl">Add New Car</h1>
        <p className="text-gray-500 w-[500px]">
          Fill in details to list a new car for booking,including
          pricing,availability and specifications
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <label htmlFor="car-image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_icon}
                alt={image ? "preview" : "upload"}
                className="w-16 h-16 object-cover border rounded"
              />
              <input
                type="file"
                id="car-image"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <p className="flex items-center justify-center text-gray-500">
              Upload a picture of your car
            </p>
          </div>
        </div>
        <div className="flex  gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW,Mercedes,Benz..."
              className="border px-3 py-2 rounded"
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g. X5,E-class,M4..."
              className="border px-3 py-2 rounded"
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>
        <div className="flex  gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Year</label>
            <select
              type="number"
              placeholder="select year"
              className="border px-3 py-2 rounded"
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            >
              <option>select year</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Daily Price({currency})</label>
            <input
              type="number"
              placeholder="100"
              className="border px-3 py-2 rounded"
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Category</label>
            <select
              type="text"
              placeholder="select category"
              className="border px-3 py-2 rounded"
              onChange={(e) => setCar({ ...car, category: e.target.value })}
            >
              <option>select a category</option>
              <option>Sedan</option>
              <option>Hatchback</option>
              <option>Luxury</option>
              <option>Convertible</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Transmission</label>
            <select
              type="text"
              placeholder="select transmission"
              className="border px-3 py-2 rounded"
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
            >
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Fuel Type</label>
            <select
              type="text"
              className="border px-3 py-2 rounded"
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
            >
              {" "}
              <option>select a fuel type</option>
              <option>Diesel</option>
              <option>Petrol</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Seating Capacity</label>
            <input
              type="text"
              placeholder="5"
              className="border px-3 py-2 rounded"
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Location</label>
          <select
            type="text"
            className="border px-3 py-2 rounded"
            onChange={(e) => setCar({ ...car, location: e.target.value })}
          >
            <option>select a location</option>
            <option>San Fransisco</option>
            <option>Texus</option>
            <option>New york</option>
            <option>USA</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Description</label>
          <textarea
            type="text"
            placeholder="Describe your car condition,and any notable details..."
            className="border px-3 py-2 rounded h-30"
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-3 py-2 items-center rounded w-34 flex gap-2"
        >
          <img src={assets.tick_icon} />
          List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;

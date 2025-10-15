import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AddCar = () => {
  const [image, setImage] = useState("");
  const { axios, currency, fetchCars } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (!image) {
      setError("image", { type: "manual", message: "Image is required" });
      return;
    }
    const payload = {
      ...data,
      pricePerDay: Number(data.pricePerDay),
      seating_capacity: Number(data.seating_capacity),
      year: Number(data.year),
    };

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(payload));

      const { data: res } = await axios.post("/api/owner/add-car", formData);

      if (res.success) {
        toast.success(res.message);
        setImage(null);
        fetchCars();
      } else {
        toast.error(res.message || "Failed to add car");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex flex-col gap-6 mx-auto mt-10 p-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl text-center">Add New Car</h1>
        <p className="text-gray-500 md:w-[500px] text-center">
          Fill in details to list a new car for booking,including
          pricing,availability and specifications
        </p>
      </div>

      <form
        className="flex flex-col gap-4 max-w-[300px]"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW,Mercedes,Benz..."
              className="border px-3 py-2 rounded"
              {...register("brand", { required: true })}
            />
            {errors.brand && <p className="text-red-500">Brand is required</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g. X5,E-class,M4..."
              className="border px-3 py-2 rounded"
              {...register("model", { required: true })}
            />
            {errors.model && <p className="text-red-500">Model is required</p>}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Year</label>
            <select
              type="number"
              placeholder="select year"
              className="border px-3 py-2 rounded"
              {...register("year", { required: "Year is required" })}
            >
              <option value="">select year</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            {errors.year && <p className="text-red-500">Year is required</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Daily Price({currency})</label>
            <input
              type="number"
              placeholder="100"
              className="border px-3 py-2 rounded"
              {...register("pricePerDay", {
                required: "Price per day is required",
              })}
            />
            {errors.pricePerDay && (
              <p className="text-red-500">Price per day is required</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Category</label>
            <select
              type="text"
              placeholder="select category"
              className="border px-3 py-2 rounded"
              {...register("category", { required: "category is required" })}
            >
              <option value="">select a category</option>
              <option value="sedan">Sedan</option>
              <option value="hatchback">Hatchback</option>
              <option value="luxury">Luxury</option>
              <option value="convertible">Convertible</option>
            </select>
            {errors.category && (
              <p className="text-red-500">Category is required</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Transmission</label>
            <select
              type="text"
              placeholder="select transmission"
              className="border px-3 py-2 rounded"
              {...register("transmission", {
                required: "transmission is required",
              })}
            >
              <option value="">select transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
            {errors.transmission && (
              <p className="text-red-500">Transmission is required</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Fuel Type</label>
            <select
              type="text"
              className="border px-3 py-2 rounded"
              {...register("fuel_type", { required: "fuel type is required" })}
            >
              <option value="">select a fuel type</option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
            </select>
            {errors.fuel_type && (
              <p className="text-red-500">Fuel type is required</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Seating Capacity</label>
            <input
              type="text"
              placeholder="5"
              className="border px-3 py-2 rounded"
              {...register("seating_capacity", {
                required: "seating capacity is required",
              })}
            />
            {errors.seating_capacity && (
              <p className="text-red-500">Seating capacity is required</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Location</label>
          <select
            type="text"
            className="border px-3 py-2 rounded"
            {...register("location", { required: "location is required" })}
          >
            <option value="">select a location</option>
            <option value="San Fransisco">San Fransisco</option>
            <option value="Texus">Texus</option>
            <option value="New york">New york</option>
            <option value="USA">USA</option>
          </select>
          {errors.location && (
            <p className="text-red-500">Location is required</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Description</label>
          <textarea
            type="text"
            placeholder="Describe your car condition,and any notable details..."
            className="border px-3 py-2 rounded h-30"
            {...register("description", {
              required: "description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-primary text-white px-3 py-2 items-center rounded w-34 flex gap-2 "
          >
            <img src={assets.tick_icon} />
            {isLoading ? "Listing..." : " List Your Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;

import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Title from "../../components/Title";

const Dashboard = () => {
  const { axios, isOwner, currency, fetchOwnerbookings, bookings } =
    useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardData = [
    {
      title: "Total cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.totalPendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.totalCompletedBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
      fetchOwnerbookings();
    }
  }, [isOwner]);
  const recentBookings = bookings.slice(0, 4);

  return (
    <div className=" flex flex-col gap-4 mx-auto mt-10 items-center">
      <Title
        title="Admin Dashboard"
        subTitle=" Monitor overall platform performance including total
          cars,bookings,revenue and recent activities"
      />
      <div className="grid  items-center justify-center sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {dashboardData.map((item, i) => (
          <div
            key={i}
            className="flex justify-between max-w-[200px] border border-gray-300 p-4 rounded-lg items-center"
          >
            <div className="flex flex-col">
              <h1 className="text-gray-500">{item.title}</h1>
              <span className="text-2xl">{item.value}</span>
            </div>
            <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center ">
              <img src={item.icon} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:justify-between gap-4 p-4">
        <div className="p-6 border border-gray-300 rounded-lg  w-full items-center md:w-[60%] flex flex-col gap-6 h-full">
          <div className=" flex flex-col gap-2">
            <p className="text-xl">Recent Bookings</p>
            <p className="text-gray-500">Latest customer bookings</p>
          </div>
          <div className="flex flex-col gap-4">
            {recentBookings.map((booking, i) => (
              <div key={i} className="flex justify-between">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <img src={assets.listIconColored} alt="list" className="" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span className="text-gray-800">{booking.car.brand}</span>
                      <span className="text-gray-800">{booking.car.model}</span>
                    </div>
                    <span className="text-gray-500 text-[12px]">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 items-center justify-center h-auto">
                  <span className="text-gray-500 text-[12px]">
                    {currency}
                    {booking.car.pricePerDay}
                  </span>
                  <p className="px-3 py-1 rounded-full border border-gray-300 items-center justify-center">
                    {booking.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg w-full items-center md:w-[40%] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className=" text-2xl">Monthly Revenue</h1>
            <p className="text-gray-500">Revenew for current month</p>
          </div>
          <span className="text-primary text-3xl font-bold">
            {currency}
            {data.monthlyRevenue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

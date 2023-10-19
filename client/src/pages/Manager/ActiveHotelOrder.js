import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
const ActiveHotelOrder = () => {
  const [staff, setStaff] = useState([]);
  const [auth] = useAuth();
 console.log("called");
 function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
  
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  }
  
  //getall customer
  const getAllOrderByBranch = async () => {
    try {
      const { data } = await axios.get(`/api/v1/hotel/get-orderbybranch/${auth?.user?.branch}`);
      console.log(data);
      setStaff(data.Orders);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Fetching order data");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllOrderByBranch();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        All Customer List
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">Order Id</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Uniqe Id</th>
              <th className="py-3 px-4 text-left">Check In</th>
              <th className="py-3 px-4 text-left">Check Out</th>
              <th className="py-3 px-4 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {staff?.map((p, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition duration-300 ease-in-out`}
              >
                <td className="py-3 px-4 whitespace-nowrap">{p.razorpay.orderId}</td>
                <td className="py-3 px-4 whitespace-nowrap">{p.OrderData.name}</td>
                <td className="py-3 px-4">{p.OrderData.idProof}</td>
                <td className="py-3 px-4">{formatDate(p.OrderData.checkin)}</td>
                <td className="py-3 px-4">{formatDate(p.OrderData.checkout)}</td>
                <td className="py-3 px-4">{p.amount}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveHotelOrder;

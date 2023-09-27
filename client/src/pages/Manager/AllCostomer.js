import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const AllCustomer = () => {
  const [staff, setStaff] = useState([]);

  //getall customer
  const getAllCustomer = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-customer");
      setStaff(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllCustomer();
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
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Address</th>
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
                <td className="py-3 px-4 whitespace-nowrap">{p.name}</td>
                <td className="py-3 px-4">{p.email}</td>
                <td className="py-3 px-4">{p.phone}</td>
                <td className="py-3 px-4">{p.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCustomer;

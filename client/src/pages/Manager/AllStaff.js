import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const AllStaff = () => {
  const [staff, setStaff] = useState([]);

  //getall Staff
  const bid = localStorage.getItem("auth");
  const auth_b_id = JSON.parse(bid);
  const b_id = auth_b_id?.user?.branch;
  const tokenn = JSON.parse(localStorage.getItem("auth")).token;

  console.log(b_id, "idididididid");
  const getAllStaff = async () => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `${tokenn}`,
        },
      };
      const { data } = await axios.get(
        `/api/v1/auth/get-staff-manager/${b_id}`,
        axiosConfig
      );
      setStaff(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllStaff();
  }, []);
  const handleGoBack = () => {
    window.location.reload(); // This will navigate back one step in the history stack
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={handleGoBack}
        >
          Back
        </button>
      </div>
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        All Staff List
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500  text-white uppercase text-sm leading-normal">
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
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-200 transition duration-300 ease-in-out`}
              >
                <td className="py-3 px-4 whitespace-nowrap ">{p.name}</td>
                <td className="py-3 px-4">{p.email}</td>
                <td className="py-3 px-4">{p.phone}</td>
                <td className="py-3 px-4">{p.address}</td>
                {/* Add more columns here if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStaff;

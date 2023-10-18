import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const HotelBookForm = () => {
  const [fullName, setFullName] = useState("");
  const [idProof, setIdProof] = useState("");
  const [phone, setPhone] = useState("");
  const [roomCount, setRoomCount] = useState(0);
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [auth] = useAuth();
  const [Subcategory, setSubcategory] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [SubCategorytId, setSubCategoryId] = useState("");
  const [CheckForAvalityAndPrice, setCheckForAvalityAndPrice] = useState({});
  const [showAvailabilityPopup, setShowAvailabilityPopup] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState([]);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(1);
  const [formResponse, setFormResponse] = useState({});
  const [calculateAmount, setCalculateAmount] = useState(1);
  const { categoryId } = useParams();
  const navigate = useNavigate();
  console.log(calculateAmount, "amount");
  const getRoomBySubCat = async () => {
    try {
      const { data } = await axios.get("/api/v1/rooms/get-rooms-subcat", {
        params: {
          Subcategory: SubCategorytId,
        },
      });
      if (data.success) {
        setCheckForAvalityAndPrice(data?.room[0]);
        console.log(CheckForAvalityAndPrice, "datacheck");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (SubCategorytId) {
      getRoomBySubCat();
    }
  }, [SubCategorytId]);
  function loadRazorpay() {
    // console.log(formResponse,"responseform");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        console.log(formResponse, "responseform");
        const result = await axios.post("/api/v1/payment/create-order-hotel", {
          OrderData: formResponse,
          amount: calculateAmount * 100,
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get("/api/v1/payment/get-razorpay-key");
        const options = {
          key: razorpayKey,
          amount: amount,
          currency: currency,
          name: "manasvi technologies",
          description: "transction to manasvi",
          order_id: order_id,
          handler: async function (response) {
            // eslint-disable-next-line
            const result = await axios.post("/api/v1/payment/hotel-pay-order", {
              paymentMode: true,
              amount: amount,
              OrderData: formResponse,
              razorpay: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              buyer: auth?.user?._id,
              branch: branchId,
            });
            // navigate(`/dashboard/user/orders`);
            toast.success("Payment Completed Successfully ");
          },
          prefill: {
            name: "Manasvi technologies",
            email: "manasvi@gmail.com",
            contact: "1111111111",
          },
          notes: {
            address: "30, minaal residency bhopal",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }
  const getCatWiseSubCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/roomsubcategory/get-sub-category/${categoryId}`
      );
      console.log(data, "data");
      if (data.success) {
        setSubcategory(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const getAllBranch = async () => {
    try {
      const { data } = await axios.get("/api/v1/branch/get-all-branch");
      setBranch(data);
    } catch (error) {
      console.error(error);
      navigate("/");
      // toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getCatWiseSubCat();
  }, [categoryId]);
  useEffect(() => {
    getAllBranch();
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/hotel/book-a-room", {
        name: fullName,
        idProof,
        phone,
        roomCount,
        adult,
        children: child,
        checkin: checkInDate,
        checkout: checkOutDate,
        address,
        branch: branchId,
        parentCategory: categoryId,
        parentSubCategory: SubCategorytId,
      });
      setFormResponse(response?.data?.Room);

      // Reset the form after successful submission
      setFullName("");
      setIdProof("");
      setPhone("");
      setRoomCount(1);
      setAdult(1);
      setChild(1);
      setCheckInDate("");
      setCheckOutDate("");
      setAddress("");
      setBranchId("");
      setSubCategoryId("");

      // Call loadRazorpay function after setting the form response
      // loadRazorpay();
      // setTimeout(loadRazorpay(), 1000);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  useEffect(() => {
    if (formResponse?.name) {
      loadRazorpay();
    }
  }, [formResponse]);
  //room count and price amount calculation
  useEffect(() => {
    if (
      roomCount !== undefined &&
      CheckForAvalityAndPrice?.price !== undefined
    ) {
      const price = Number(CheckForAvalityAndPrice?.price);
      const roomCountValue = Number(roomCount);

      if (!isNaN(price) && !isNaN(roomCountValue)) {
        setCalculateAmount(price * roomCountValue);
      } else {
        console.error("Invalid price or roomCount format");
      }
    }
  }, [roomCount, CheckForAvalityAndPrice]);
  useEffect(() => {
    if (CheckForAvalityAndPrice?.quantity === 0) {
      const alertMessage =
        "Rooms are not available for this category. Redirecting to home page...";
      if (window.confirm(alertMessage)) {
        navigate("/");
      }
    }
  }, [CheckForAvalityAndPrice]);
  return (
    <Layout>
      <form onSubmit={handleFormSubmit} className="p-8 pt-20">
        <div className="mb-4">
          <label htmlFor="fullName" className="block font-medium text-gray-700">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4">
          <select
            className="block w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={branchId}
            onChange={(e) => {
              setBranchId(e.target.value);
            }}
          >
            <option value="">Select a Bed type</option>
            {branch?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            className="block w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={SubCategorytId}
            onChange={(e) => {
              setSubCategoryId(e.target.value);
            }}
          >
            <option value="">Select a Bed type</option>
            {Subcategory?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="idProof" className="block font-medium text-gray-700">
            ID Proof:
          </label>
          <input
            type="text"
            id="idProof"
            name="idProof"
            value={idProof}
            onChange={(e) => setIdProof(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="roomCount"
            className="block font-medium text-gray-700"
          >
            Room Count:
          </label>
          <input
            type="number"
            id="roomCount"
            name="roomCount"
            value={roomCount}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              
                setRoomCount(value);
              
            }}
            onBlur={(e) => setRoomCount(e.target.valueAsNumber)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          {CheckForAvalityAndPrice?.quantity > 0 && (
            <p className="text-red-500 mt-2">
              Hurry Up! Only {CheckForAvalityAndPrice.quantity} rooms available.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="adult" className="block font-medium text-gray-700">
            Adult:
          </label>
          <input
            type="number"
            id="adult"
            name="adult"
            value={adult}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 0) {
                setAmount(value);
              }
            }}
            onBlur={(e) => setAdult(parseInt(e.target.value, 10))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="child" className="block font-medium text-gray-700">
            Child:
          </label>
          <input
            type="text"
            id="child"
            name="child"
            value={child}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 0) {
                setChild(value);
              }
            }}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="checkInDate"
            className="block font-medium text-gray-700"
          >
            Check-in Date:
          </label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="checkOutDate"
            className="block font-medium text-gray-700"
          >
            Check-out Date:
          </label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block font-medium text-gray-700">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 transition duration-300"
        >
          Book Now
        </button>
      </form>
    </Layout>
  );
};

export default HotelBookForm;

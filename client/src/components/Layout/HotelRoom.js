import React, { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Layout from "./Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link,useNavigate} from "react-router-dom";


function HotelRoom() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomTypeAc, setRoomTypeAc] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [idProof, setIdProof] = useState("");
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");
  const [proof, setProof] = useState("");
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [branch, setBranch] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const cancelButtonRef = useRef(null);
  const navigate=useNavigate();
  const handleBooking = async() => {
    setOpen(true);
  };
  
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/roomcategory/get-room-category"
      );
      if (data?.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('/api/v1/hotel/book-a-room', {
  //       name: fullName,
  //       idProof,
  //       phone,
  //       roomCount,
  //       adult,
  //       children: child,
  //       checkin: checkInDate,
  //       checkout: checkOutDate,
  //       address,
  //     });

  //     console.log(response.data);

  //     // Reset the form after successful submission
  //     setFullName('');
  //     setIdProof('');
  //     setPhone('');
  //     setRoomCount(1);
  //     setAdult(1);
  //     setChild(1);
  //     setCheckInDate('');
  //     setCheckOutDate('');
  //     setAddress('');
  //     setOpen(true)
  //   } catch (error) {
  //     console.error('Error submitting the form:', error);
  //     // Handle error if needed
  //   }
  // };

  useEffect(() => {
    getAllCategory();
  }, []);

 
  const getAllBranch = async () => {
    try {
      const { data } = await axios.get("/api/v1/branch/get-all-branch");
      console.log(data,"branchdata");
      setBranch(data);
    } catch (error) {
      console.error(error);
      navigate("/");
      // toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getAllBranch();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleExploreClick = (categoryId) => {
    const isLoggedIn = JSON.parse(localStorage.getItem("auth"))?.success;
    // const check=isLoggedIn.success;

    
    console.log("called");
    if (isLoggedIn) {
      // console.log(categoryId,"id")
      navigate(`/hotelBookForm/${categoryId}`);
    } else {
      console.log("login ");
      navigate('/login');
    }
  };

  return (
    <Layout>
      {/*  */}
      {/* Categories Section */}
      <div className="col-span-3">
        <h2 className="text-2xl font-semibold mb-4 mt-20">Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
  {category?.map((c) => (
    <div
      key={c._id}
      className={`col-md-4 mt-5 mb-3 gx-3 gy-3 category ${
        selectedCategory === c._id ? "category-active" : ""
      }`}
      onClick={() => handleCategoryClick(c._id)}
    >
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{c.name}</div>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #Category
          </span>
          {/* You can add more details here if needed */}
        </div>
        <div className="p-4">
        <button
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  onClick={() => handleExploreClick(c._id)}
>
  Explore
</button>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>

      {/*  */}
      <div className="my-20">
        <h1 className="text-3xl font-semibold mb-6">
          Explore Our Other Outlet
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {branch.map((h) => (
            <div key={h._id} className="bg-white shadow-lg rounded-lg p-4">
              
              <div className="p-4">
                <p className="text-gray-600 mb-4">{h.name}</p>
                <button
                  className="bg-teal-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 transition duration-300"
                  onClick={() => handleBooking()}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start ">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <form onSubmit={handleFormSubmit} className="p-8">
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
        <label htmlFor="roomCount" className="block font-medium text-gray-700">
          Room Count:
        </label>
        <input
          type="number"
          id="roomCount"
          name="roomCount"
          value={roomCount}
          onChange={(e) => setRoomCount(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
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
          onChange={(e) => setAdult(e.target.value)}
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
          onChange={(e) => setChild(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="checkInDate" className="block font-medium text-gray-700">
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
        <label htmlFor="checkOutDate" className="block font-medium text-gray-700">
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
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root> */}
    </Layout>
  );
}

export default HotelRoom;
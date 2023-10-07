import React, { useState,Fragment,useRef, useEffect} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import Layout from "./Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";



function HotelRoom() {

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomTypeAc, setRoomTypeAc] = useState('');
    const [roomCount, setRoomCount] = useState(1);
    const [guestCount, setGuestCount] = useState(1);
    const [open, setOpen] = useState(false)
    const [rooms, setRooms] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const cancelButtonRef = useRef(null)

    const handleBooking = () => {
      setOpen(true);
      
    };
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/api/v1/roomcategory/get-room-category");
        if (data?.success) {
          setCategory(data.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting category");
      }
    };

    useEffect(()=>{
      getAllCategory();
      
    },[])
    
    const getAllRooms=async()=>{
      try {
        const {data}=await axios.get("/api/v1/room/get-rooms");
        if(data?.success){
          setRooms(data.room)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting rooms");
      }
    }
    
    useEffect(()=>{
      getAllRooms()
      
    },[])
    
    const handleCategoryClick = (categoryId) => {
      setSelectedCategory(categoryId);
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
                  <div className="card bg-light bg-gradient">
                    <Link
                      // to={`/category/${c.slug}`}
                      className="btn p-4"
                      style={{
                        background: "#fff",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transition: "background 0.3s, box-shadow 0.3s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.background = "#99aab5")
                      }
                      onMouseOut={(e) => (e.target.style.background = "#fff")}
                    >
                      {c.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

{/*  */}
      <div className="my-20">
        <h1 className="text-3xl font-semibold mb-6">Welcome to Hotel
         Booking</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {rooms

        .map((h) => (
            <div key={h._id} className="bg-white shadow-lg rounded-lg p-4">
              {/* <img
                // src={h.image}
                className="w-full h-40 object-cover rounded-t-lg"
                alt={h.name}
              /> */}
              <div className="p-4">
                <p className="text-gray-600 mb-4">{h.description}</p>
                <p className="text-lg font-semibold text-indigo-700 mb-2">
                  Price: ₹ {h.price}
                </p>
                <button className="bg-teal-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 transition duration-300" onClick={() => handleBooking()}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>




      </div>

      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                  <div className="sm:flex sm:items-start">
                    
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <form onSubmit={handleBooking} className="p-8">
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

      <div className="mb-6">
        <label htmlFor="guestCount" className="block font-medium text-gray-700">
          Guest Count:
        </label>
        <input
          type="number"
          id="guestCount"
          name="guestCount"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>


      <div className="mb-4">
  <div className="flex items-center">
  <label htmlFor="roomTypeAc" className="block font-medium text-gray-700 p-2">
    Room Type:
  </label>
  <select
    name="roomTypeAc"
    id="roomTypeAc"
    value={roomTypeAc}
    onChange={(e) => setRoomTypeAc(e.target.value)}
    className="border border-gray-300 px-2 py-1 rounded-lg"
  >
    <option value="AC">AC</option>
    <option value="Non-AC">Non-AC</option>
  </select>
</div>

</div>



<div className="mb-4">
  <div className="flex items-center">
  <label htmlFor="roomTypeBed" className="block font-medium text-gray-700 p-2">
    Bed Type:
  </label>

<div className="flex items-center">
<select
  name="roomType"
  value={roomType}
  onChange={(e) => setRoomType(e.target.value)}
  className="border border-gray-300 px-2 py-1 rounded-lg"
>
  <option value="Single bed">Single-Bed</option>
  <option value="Double bed">Double-Bed</option>
</select>
</div>
</div>

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
    </Transition.Root>
      
    </Layout>






  );
  
}

export default HotelRoom;
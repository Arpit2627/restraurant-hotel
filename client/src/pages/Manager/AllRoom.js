import React, { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";

function AllRoom() {
  const params = useParams();
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubCategory] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [id, setId] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const cancelButtonRef = useRef(null);

  const handleBooking = (room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  const getAllRooms = async () => {
    try {
      const { data } = await axios.get("/api/v1/room/get-rooms");
      if (data?.success) {
        setRooms(data.room);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting rooms");
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/roomcategory/get-room-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  const getAllSubCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/roomsubcategory/get-sub-category/${category}`
      );
      setSubCategories(data?.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    getAllSubCategory();
  }, [category]);

  useEffect(() => {
    // When selectedRoom changes, set the form values
    if (selectedRoom) {
      setCategory(selectedRoom.category?._id || ''); // Use optional chaining to safely access properties
      setSubCategory(selectedRoom.subcategory?._id || '');
      setPrice(selectedRoom.price || '');
      setQuantity(selectedRoom.quantity || '');
      setDescription(selectedRoom.description || '');
      setId(selectedRoom._id || '');
    }
  }, [selectedRoom]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const roomData = new FormData();
      roomData.append("price", price);
      roomData.append("quantity", quantity);
      roomData.append("description", description);
      roomData.append("category", category);
      roomData.append("subcategory", subcategory);
    console.log(price);
    console.log(quantity);
    console.log(description);
    console.log(category);
    console.log(subcategory);
    // console.log(roomData,"room");
    const { data } = await axios.put(
      `/api/v1/room/update-room/${id}`,
      roomData
    );
    if (data?.success) {
      toast.success("Room Updated Successfully");
      // navigate("/");
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong");
  }


};

  return (
    <div>
      <div className="my-20">
        <h1 className="text-3xl font-semibold mb-6">
          Welcome to Hotel Booking
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {rooms.map((h) => (
            <div key={h._id} className="bg-white shadow-lg rounded-lg p-4">
              <div className="p-4">
                <p className="text-gray-600 mb-4">{h.description}</p>
                <p className="text-lg font-semibold text-indigo-700 mb-2">
                  Price: ₹ {h.price}
                </p>
                <button
                  className="bg-teal-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 transition duration-300"
                  onClick={() => handleBooking(h)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setOpen(false);
            setSelectedRoom(null);
          }}
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
                  <div className="container bg-gray-200 mx-auto mt-8 p-4">
                    <div className="bg-white shadow-md rounded-lg p-8 mb-4">
                      <h1 className="text-3xl font-semibold mb-6">
                        Update Rooms
                      </h1>
                      <div className="w-3/4 mx-auto">
                        <select
                          className="block w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        >
                          {categories?.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>

                        <select
                          className="block w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={subcategory}
                          onChange={(e) => {
                            setSubCategory(e.target.value);
                          }}
                        >
                          {subcategories?.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>

                        <div className="mb-6">
                          <input
                            type="number"
                            value={price}
                            placeholder="Price"
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>

                        <div className="mb-6">
                          <input
                            type="number"
                            value={quantity}
                            placeholder="Quantity"
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </div>

                        <div className="mb-6">
                          <input
                            type="text"
                            value={description}
                            placeholder="Description"
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>

                        <div className="mb-6 ">
                          <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleUpdate}
                          >
                            UPDATE Room
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default AllRoom;

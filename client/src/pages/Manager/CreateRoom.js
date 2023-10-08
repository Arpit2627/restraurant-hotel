import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function CreateRoom(props) {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");


  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/room/create-rooms", {
        price,
        quantity,
        description
      });
      if (data?.success) {
        toast.success(data?.message);
        setPrice("");
        setQuantity("");
        setDescription("")
        alert(data?.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("something went wrong in input form");
    }
  };

  
     
  return (
    <>
          <div className="container mx-auto p-4">
          <h2>Create Room</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleRoomSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
    </>
  
  );
}
export default CreateRoom;

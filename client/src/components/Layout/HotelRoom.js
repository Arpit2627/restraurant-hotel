import React, { useState,Fragment,useRef} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import Layout from "./Layout";



const hotels = [
  {
    name: "Hotel A",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fseoimgak.mmtcdn.com%2Fblog%2Fsites%2Fdefault%2Ffiles%2Fimages%2FJaisalkot.jpg&f=1&nofb=1&ipt=e9231278956e56776a082f2d01ca29583fb314af388c6175707e5b053a1bb785&ipo=images",
    description: "My first hotel",
    price: 1500,
    button: "Book",
  },
  {
    name: "Hotel B",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.oyoroomscdn.com%2Fuploads%2Fhotel_image%2F7129%2F5dfa5d6171aab747.jpg&f=1&nofb=1&ipt=e9f8f1c98d1e36a015141e671e34f2804afcdd0b40d6cd8e7f016cc318398559&ipo=images",
    description: "Second hotel",
    price: 1000,
    button: "Book",
  },
  {
    name: "Hotel C",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.architecturaldigest.com%2Fphotos%2F55e79238302ba71f3017ec4e%2Fmaster%2Fpass%2Fdam-images-travel-2015-heritage-hotels-boutique-heritage-hotels-india-04.jpg&f=1&nofb=1&ipt=33526080071fb4c81f50c272252e5f91fb6c1f05fa700ddd2f40efca2c3b3f79&ipo=images",
    description: "Third hotel",
    price: 2000,
    button: "Book",
  },
  {
    name: "Hotel D",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.architecturaldigest.com%2Fphotos%2F55e79238302ba71f3017ec4e%2Fmaster%2Fpass%2Fdam-images-travel-2015-heritage-hotels-boutique-heritage-hotels-india-04.jpg&f=1&nofb=1&ipt=33526080071fb4c81f50c272252e5f91fb6c1f05fa700ddd2f40efca2c3b3f79&ipo=images",
    description: "Third hotel",
    price: 2000,
    button: "Book",
  },
  {
    name: "Hotel E",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.architecturaldigest.com%2Fphotos%2F55e79238302ba71f3017ec4e%2Fmaster%2Fpass%2Fdam-images-travel-2015-heritage-hotels-boutique-heritage-hotels-india-04.jpg&f=1&nofb=1&ipt=33526080071fb4c81f50c272252e5f91fb6c1f05fa700ddd2f40efca2c3b3f79&ipo=images",
    description: "Third hotel",
    price: 2000,
    button: "Book",
  },
  {
    name: "Hotel F",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.architecturaldigest.com%2Fphotos%2F55e79238302ba71f3017ec4e%2Fmaster%2Fpass%2Fdam-images-travel-2015-heritage-hotels-boutique-heritage-hotels-india-04.jpg&f=1&nofb=1&ipt=33526080071fb4c81f50c272252e5f91fb6c1f05fa700ddd2f40efca2c3b3f79&ipo=images",
    description: "Third hotel",
    price: 2000,
    button: "Book",
  },
];

function HotelRoom() {

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomTypeAc, setRoomTypeAc] = useState('');
    const [roomCount, setRoomCount] = useState(1);
    const [guestCount, setGuestCount] = useState(1);
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const handleBooking = () => {
        setOpen(true);

    };
  


  return (
    <Layout>
      <div className="my-20">
        <h1 className="text-3xl font-semibold mb-6">Welcome to Hotel Booking</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={hotel.image}
                className="w-full h-40 object-cover rounded-t-lg"
                alt={hotel.name}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
                <p className="text-gray-600 mb-4">{hotel.description}</p>
                <p className="text-lg font-semibold text-indigo-700 mb-2">
                  Price: ${hotel.price}
                </p>
                <button className="bg-teal-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 transition duration-300" onClick={() => handleBooking()}>
                  {hotel.button}
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
  <label className="block font-medium text-gray-700">Room Type:</label>
  <div className="flex items-center">
    <label className="mr-4">
      <input
        type="radio"
        name="roomTypeAc"
        value="AC"
        checked={roomTypeAc === "AC"}
        onChange={() => setRoomTypeAc("AC")}
        className="mr-2"
      />
      AC
    </label>
    <label>
      <input
        type="radio"
        name="roomTypeAc"
        value="Non-AC"
        checked={roomTypeAc === "Non-AC"}
        onChange={() => setRoomTypeAc("Non-AC")}
        className="mr-2"
      />
      Non-AC
    </label>
  </div>
</div>



<div className="mb-4">
<label className="block font-medium text-gray-700">Bed Type:</label>

<div className="flex items-center">
    <label className="mr-4">
      <input
        type="radio"
        name="roomType"
        value="Single bed"
        checked={roomType === "Single bed"}
        onChange={() => setRoomType("Single bed")}
        className="mr-2"
      />
      Single-Bed
    </label>
    <label>
      <input
        type="radio"
        name="roomType"
        value="Double bed"
        checked={roomType === "Double-bed"}
        onChange={() => setRoomType("Double-bed")}
        className="mr-2"
      />
      Double-Bed
    </label>
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
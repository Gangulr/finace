import React, { useState, useEffect } from 'react';
import { FaUser, FaWallet, FaArrowCircleUp, FaArrowCircleDown, FaChartLine } from 'react-icons/fa'; // Import icons from React Icons
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


export default function Dashboard() {
  // State to store the financial summary data
  const [financialSummary, setFinancialSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser._id);
  const customerId = currentUser ? currentUser._id : null;


  useEffect(() => {
    // Fetch the financial summary data for the user
    const fetchFinancialSummary = async () => {
      try {
        const response = await fetch(`/api/auth/user/${customerId}/financial-summary`); // Replace with your user ID and endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch financial summary');
        }
        const data = await response.json();
        setFinancialSummary(data); // Update state with fetched data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message); // Set error if any occurred
        setLoading(false);
      }
    };

    fetchFinancialSummary(); // Call the function to fetch data
  }, []); // Empty dependency array means this runs only once when the component mounts

  if (loading) {
    return (
      <div className='h-[800px] bg-black'>
      <div className="absolute inset-0 flex items-center justify-center  bg-black bg-opacity-60 z-50">
        <div className="text-white text-2xl">Loading...</div>
      </div>
      </div>
    );
  }
  

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/14856610/pexels-photo-14856610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="space-y-6 text-center max-w-7xl w-full px-6">
          <h1 className="text-4xl font-extrabold mt-[-180px] text-white mb-10">Your Financial Dashboard</h1>

          {/* Welcome Message */}
       

          {/* Financial Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-800 p-4 rounded-lg text-white">
              <h4 className="text-lg font-semibold">Total Income</h4>
              <p className="text-2xl">${financialSummary.income}</p>
            </div>
            <div className="bg-red-800 p-4 rounded-lg text-white">
              <h4 className="text-lg font-semibold">Total Expenses</h4>
              <p className="text-2xl">${financialSummary.expenses}</p>
            </div>
            <div className="bg-green-800 p-4 rounded-lg text-white">
              <h4 className="text-lg font-semibold">Budget</h4>
              <p className="text-2xl">${financialSummary.budget}</p>
            </div>
          </div>

          {/* Navigation Buttons - Horizontal Layout */}
          <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-center">
            {/* Profile Button */}
            <Link to={`/profile`}>
            <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
              <FaUser className="text-2xl" />
              <span className="ml-3 text-lg">Profile</span>
            </button>
            </Link>

            {/* Income Button */}
            <Link to={`/itable`}>
            <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-gray-600 via-gray-700 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
              <FaWallet className="text-2xl" />
              
                <span className="ml-3 text-lg">Income</span>
             
             
            </button>
            </Link>

            {/* Expense Button */}
            <Link to={`/etable`}>
            <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-red-700 via-red-800 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
              <FaArrowCircleUp className="text-2xl" />
              <span className="ml-3 text-lg">Expense</span>
            </button>
            </Link>

            {/* Budget Button */}
            <Link to={`/Btable`}>
            <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-green-700 via-green-800 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
              <FaArrowCircleDown className="text-2xl" />
              <span className="ml-3 text-lg">Budget</span>
            </button>
            </Link>

            {/* Financial Trends Button */}
            <Link to={`/Boat`}>
            <button className="flex items-center justify-between w-full sm:w-60 p-4 bg-gradient-to-r from-yellow-700 via-yellow-800 to-black text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 ease-in-out hover:ring-2 hover:ring-white hover:ring-opacity-50">
              <FaChartLine className="text-2xl" />
              <span className="ml-3 text-lg">Chat Boat</span>
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Image Section for Rich Visuals */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          <img src="https://img.freepik.com/free-photo/photorealistic-money-with-chest_23-2151027596.jpg?t=st=1742385863~exp=1742389463~hmac=36b7e370daaaa9e7393ea025c42a0330d8c9162a5b8d3e66aa7854386a415a51&w=826" alt="Image 1" className="w-full h-64 object-cover rounded-lg shadow-md" />
          <img src="https://img.freepik.com/free-photo/adult-with-loths-money_23-2151694271.jpg?t=st=1742385871~exp=1742389471~hmac=8386912310c91acc44ed8d1309e8c291ad92b3682a1e210d664d0e1aff411730&w=1380" alt="Image 2" className="w-full h-64 object-cover rounded-lg shadow-md" />
          <img src="https://img.freepik.com/free-photo/anime-style-money-fire_23-2151152138.jpg?t=st=1742385879~exp=1742389479~hmac=2fa625ebb7ee5466959538af0db5f3a3817a460f08fe0231d1fc6c1ebcebd13b&w=1380" alt="Image 3" className="w-full h-64 object-cover rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
}

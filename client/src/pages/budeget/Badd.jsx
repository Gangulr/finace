import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaMoneyBillWave, FaCalendarAlt, FaFileAlt } from "react-icons/fa"; // Importing icons

export default function BAdd() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  console.log(formData)
    const [validation, setValidation] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const detail = {
        userId: currentUser._id,
        ...formData
      };

      console.log(detail);

      const res = await fetch("http://localhost:3000/api/budgets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(detail)
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        console.log("sussessfull");
        alert("suscessfull");
        navigate("/Btable");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };


    //validation
    const handleamoutChange = (e) => {
      const amount = e.target.value.trim();
      const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers
  
      if (amount === "") {
          setValidation(null);
      } else if (!quantityPattern.test(amount)) {
          if (isNaN(amount)) {
              setValidation("amount must be a number");
          } else {
              setValidation("amount must be a positive integer");
          }
      } else {
          setFormData({ ...formData, amount });
          setValidation(null);
      }
  };

  return (
    <div
      className="relative w-full h-[800px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/14856610/pexels-photo-14856610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)"
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center w-full max-w-md mt-20 space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg opacity-90">
          <h1 className="text-3xl font-bold text-center text-white">
            Add Budget
          </h1>
          <Link
            to={`/Btable`}
            className="text-md text-gray-400 hover:text-blue-400 underline"
          >
            Back
          </Link>
          {publishError && (
            <p className="text-red-500 text-sm">{publishError}</p>
          )}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex items-center space-x-2">
              <FaMoneyBillWave className="text-gray-400" />
              <input
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                type="text"
                placeholder="Amount"
                id="amount"
                onChange={handleamoutChange}
              />
            </div>

            <div className='mt-[-30px]'>
                {validation && (
                    <p className=" text-red-700      rounded-lg text-center ">
                      {validation}
                    </p>
                     )}

                </div>



            <div className="flex items-center space-x-2">
                                <FaFileAlt className="text-gray-400" />
                                <select
                                    name="category"
                                    id="category"
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    required
                                >
                                    <option value="" disabled>Category</option>
                                    <option value="">select</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

           

            <div className="flex flex-col space-y-2">
  <label htmlFor="dateReceived" className="text-gray-300 ml-6 opacity-50 font-semibold">
  Start Date
  </label>
  <div className="flex items-center space-x-2">
    <FaCalendarAlt className="text-gray-400" />
    <input
      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      type="date"
      placeholder="startDate"
      id="startDate"
      onChange={handleChange}
    />
  </div>
</div>

            



            <div className="flex flex-col space-y-2">
  <label htmlFor="dateReceived" className="text-gray-300 ml-6 opacity-50 font-semibold">
  End Date
  </label>
  <div className="flex items-center space-x-2">
    <FaCalendarAlt className="text-gray-400" />
    <input
      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      type="date"
      placeholder="Date Received"
      id="endDate"
      onChange={handleChange}
    />
  </div>
</div>

           

            <div>
              <textarea
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Notes"
                id="notes"
                onChange={handleChange}
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

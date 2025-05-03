import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaClipboardList, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

// Helper to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function Add() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [validation, setValidation] = useState(null);
  const [dateValidation, setDateValidation] = useState(null);
  const navigate = useNavigate();

  const today = getTodayDate(); // e.g., "2025-05-03"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Validation for amount field
  const handleamoutChange = (e) => {
    const amount = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (amount === "") {
      setValidation(null);
      setFormData({ ...formData, amount: "" });
    } else if (!quantityPattern.test(amount)) {
      if (isNaN(amount)) {
        setValidation("Amount must be a number");
      } else {
        setValidation("Amount must be a positive integer");
      }
      setFormData({ ...formData, amount: "" });
    } else {
      setFormData({ ...formData, amount });
      setValidation(null);
    }
  };

  // Date validation: cannot pick past dates
  const handleDateChange = (e) => {
    const date = e.target.value.trim();
    setFormData({ ...formData, [e.target.id]: date });
    if (date && date < today) {
      setDateValidation("Date cannot be in the past.");
    } else {
      setDateValidation(null);
    }
  };

  // Final validation before submit
  const validateBeforeSubmit = () => {
    if (!formData.amount) {
      setPublishError("Amount is required and must be a positive integer.");
      return false;
    }
    if (!formData.source) {
      setPublishError("Source is required.");
      return false;
    }
    if (!formData.category) {
      setPublishError("Category is required.");
      return false;
    }
    if (!formData.dateReceived) {
      setPublishError("Date Received is required.");
      return false;
    }
    if (formData.dateReceived < today) {
      setPublishError("Date Received cannot be in the past.");
      return false;
    }
    setPublishError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateBeforeSubmit()) return;

    try {
      const detail = {
        userId: currentUser._id,
        ...formData
      }
      const res = await fetch("http://localhost:3000/api/incomes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      alert("successful");
      navigate('/itable');
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="relative w-full h-[800px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/14856610/pexels-photo-14856610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center w-full max-w-md space-y-6 mt-28 bg-gray-800 p-8 rounded-xl shadow-lg opacity-90">
          <h1 className="text-3xl font-bold text-center text-white">Add Income</h1>
          <Link to={`/itable`} className="text-md text-gray-400 hover:text-blue-400 underline">
            Back
          </Link>
          {publishError && <p className="text-red-500 text-sm">{publishError}</p>}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex items-center space-x-2">
              <FaMoneyBillWave className="text-gray-400" />
              <input
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                type="text"
                placeholder="Amount"
                id="amount"
                onChange={handleamoutChange}
                value={formData.amount || ""}
                required
              />
            </div>
            <div className='mt-[-30px]'>
              {validation && (
                <p className=" text-red-700 rounded-lg text-center ">
                  {validation}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <FaClipboardList className="text-gray-400" />
              <input
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                type="text"
                placeholder="Source"
                id="source"
                onChange={handleChange}
                value={formData.source || ""}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaFileAlt className="text-gray-400" />
              <select
                name="category"
                id="category"
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={formData.category || ""}
                required
              >
                <option value="" disabled>Category</option>
                <option value="">select</option>
                <option value="Salary">Salary</option>
                <option value="Business">Business</option>
                <option value="Freelance">Freelance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="dateReceived" className="text-gray-300 ml-6 opacity-50 font-semibold">
                Date Received
              </label>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-400" />
                <input
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  type="date"
                  placeholder="Date Received"
                  id="dateReceived"
                  onChange={handleDateChange}
                  min={today}
                  value={formData.dateReceived || ""}
                  required
                />
              </div>
              {dateValidation && (
                <p className="text-red-700 rounded-lg text-center">
                  {dateValidation}
                </p>
              )}
            </div>

            <div>
              <textarea
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Notes"
                id="notes"
                onChange={handleChange}
                rows="4"
                value={formData.notes || ""}
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!!validation || !!dateValidation}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

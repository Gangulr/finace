import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

// Helper to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function EAdd() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [validation, setValidation] = useState(null);
  const [dateValidation, setDateValidation] = useState(null);
  const navigate = useNavigate();

  const today = getTodayDate(); // 2025-05-03

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Amount validation
  const handleAmountChange = (e) => {
    const amount = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/;

    if (amount === "") {
      setValidation(null);
      setFormData({ ...formData, amount: "" });
    } else if (!quantityPattern.test(amount)) {
      setValidation(isNaN(amount) ? "Amount must be a number" : "Amount must be a positive integer");
      setFormData({ ...formData, amount: "" });
    } else {
      setFormData({ ...formData, amount });
      setValidation(null);
    }
  };

  // Date validation handler
  const handleDateChange = (e) => {
    const date = e.target.value;
    setFormData({ ...formData, [e.target.id]: date });
    
    if (date < today) {
      setDateValidation("Date cannot be in the past");
    } else {
      setDateValidation(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation check
    if (!formData.amount) {
      setPublishError("Amount is required");
      return;
    }
    if (!formData.category || formData.category === "") {
      setPublishError("Category is required");
      return;
    }
    if (!formData.paymentMethod || formData.paymentMethod === "") {
      setPublishError("Payment method is required");
      return;
    }
    if (!formData.dateSpent) {
      setPublishError("Date spent is required");
      return;
    }
    if (formData.dateSpent < today) {
      setPublishError("Date cannot be in the past");
      return;
    }

    try {
      const detail = {
        userId: currentUser._id,
        ...formData
      };

      const res = await fetch("http://localhost:3000/api/expenses/create", {
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
      alert("Expense added successfully!");
      navigate('/etable');
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="relative w-full h-[800px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/14856610/pexels-photo-14856610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center w-full max-w-md space-y-6 mt-36 mb-8 bg-gray-800 p-8 rounded-xl shadow-lg opacity-90">
          <h1 className="text-3xl font-bold text-center text-white">Add Expense</h1>
          <Link to={`/etable`} className="text-md text-gray-400 hover:text-blue-400 underline">
            Back
          </Link>
          {publishError && <p className="text-red-500 text-sm">{publishError}</p>}
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Amount Input */}
            <div className="flex items-center space-x-2">
              <FaMoneyBillWave className="text-gray-400" />
              <input
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                type="text"
                placeholder="Amount"
                id="amount"
                onChange={handleAmountChange}
                value={formData.amount || ""}
                required
              />
            </div>
            {validation && <p className="text-red-700 rounded-lg text-center mt-[-20px]">{validation}</p>}

            {/* Category Select */}
            <div className="flex items-center space-x-2">
              <FaFileAlt className="text-gray-400" />
              <select
                id="category"
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={formData.category || ""}
                required
              >
                <option value="" disabled>Category</option>
                <option value="">Select</option>
                <option value="Salary">Salary</option>
                <option value="Rent">Rent</option>
                <option value="Bills">Bills</option>
                <option value="Grocery">Grocery</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Payment Method Select */}
            <div className="flex items-center space-x-2">
              <FaFileAlt className="text-gray-400" />
              <select
                id="paymentMethod"
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={formData.paymentMethod || ""}
                required
              >
                <option value="" disabled>Payment Method</option>
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Date Spent Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="dateSpent" className="text-gray-300 ml-6 opacity-50 font-semibold">
                Date Spent
              </label>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-400" />
                <input
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  type="date"
                  id="dateSpent"
                  onChange={handleDateChange}
                  min={today}
                  value={formData.dateSpent || ""}
                  required
                />
              </div>
              {dateValidation && <p className="text-red-700 rounded-lg text-center">{dateValidation}</p>}
            </div>

            {/* Notes Textarea */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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

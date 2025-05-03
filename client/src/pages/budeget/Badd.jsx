import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCalendarAlt, FaFileAlt } from "react-icons/fa";

// Helper to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function BAdd() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [validation, setValidation] = useState(null);
  const [dateValidation, setDateValidation] = useState(null);

  const navigate = useNavigate();

  // Get today's date for min attribute
  const today = getTodayDate();

  // Handle changes for all fields except amount
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

  // Date validation: endDate must be >= startDate, and both >= today
  const validateDates = () => {
    const { startDate, endDate } = formData;
    if (!startDate || !endDate) {
      setDateValidation(null);
      return true;
    }
    if (startDate < today) {
      setDateValidation("Start date cannot be in the past.");
      return false;
    }
    if (endDate < today) {
      setDateValidation("End date cannot be in the past.");
      return false;
    }
    if (endDate < startDate) {
      setDateValidation("End date cannot be before start date.");
      return false;
    }
    setDateValidation(null);
    return true;
  };

  // Watch for date changes to validate
  useEffect(() => {
    validateDates();
    // eslint-disable-next-line
  }, [formData.startDate, formData.endDate]);

  // Submit handler with all validations
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submit
    if (!formData.amount) {
      setPublishError("Amount is required and must be a positive integer.");
      return;
    }
    if (!formData.category) {
      setPublishError("Category is required.");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setPublishError("Start and End dates are required.");
      return;
    }
    if (!validateDates()) {
      setPublishError("Please correct the date fields.");
      return;
    }

    try {
      const detail = {
        userId: currentUser._id,
        ...formData,
      };

      const res = await fetch("http://localhost:3000/api/budgets/create", {
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
      alert("Successful");
      navigate("/Btable");
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div
      className="relative w-full h-[800px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/14856610/pexels-photo-14856610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      }}
    >
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
                value={formData.amount || ""}
                required
              />
            </div>

            <div className="mt-[-30px]">
              {validation && (
                <p className=" text-red-700 rounded-lg text-center ">
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
                value={formData.category || ""}
                required
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="">select</option>
               
                <option value="Rent">Rent</option>
                <option value="Bills">Bills</option>
                <option value="Grocery">Grocery</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="startDate"
                className="text-gray-300 ml-6 opacity-50 font-semibold"
              >
                Start Date
              </label>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-400" />
                <input
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  type="date"
                  placeholder="Start Date"
                  id="startDate"
                  onChange={handleChange}
                  min={today}
                  value={formData.startDate || ""}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="endDate"
                className="text-gray-300 ml-6 opacity-50 font-semibold"
              >
                End Date
              </label>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-400" />
                <input
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  type="date"
                  placeholder="End Date"
                  id="endDate"
                  onChange={handleChange}
                  min={formData.startDate || today}
                  value={formData.endDate || ""}
                  required
                />
              </div>
            </div>

            {dateValidation && (
              <div>
                <p className="text-red-700 rounded-lg text-center">
                  {dateValidation}
                </p>
              </div>
            )}

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
  );
}

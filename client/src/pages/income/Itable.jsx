import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  const customerId = currentUser ? currentUser._id : null;

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/incomes/Items/${customerId}`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (customerId) fetchinfo();
  }, [customerId]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Amount", "Source", "Date Received", "Category", "Notes"]],
      body: filter.map((item) => [
        item.amount,
        item.source,
        item.dateReceived,
        item.category,
        item.notes,
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 0, 255] },
    });
    doc.save("income.pdf");
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/incomes/delete/${DId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInfo((prev) => prev.filter((item) => item._id !== DId));
        alert("Deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  return (
    <div className="h-[800px] relative bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/14856610/pexels-photo-14856610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center pt-24 px-4">
        <h2 className="text-4xl font-bold text-white mb-6">Incomes</h2>

        {/* Search Input */}
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-[400px] h-10 mt-4 rounded-full bg-black shadow-xl border border-slate-400 bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={generatePDF}
            className="mt-4 bg-blue-600 font-serif text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
          <Link to={`/Iadd`}>
            <button className="mt-4 bg-blue-600 font-serif text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
              Add Income
            </button>
          </Link>
        </div>

        <Link to={`/dash`} className="text-md text-gray-400 hover:text-blue-400 underline flex items-center mt-4">
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>

        {/* Table Container */}
        <div className="lg:w-[1200px] mt-4 rounded-3xl shadow-xl bg-gray-800 text-white overflow-hidden">
          <div className="overflow-x-auto lg:h-[500px]">
            <table className="min-w-full bg-gray-800 text-sm">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Source</th>
                  <th className="px-6 py-4 text-left">Date Received</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Notes</th>
                  <th className="px-6 py-4 text-center">Edit</th>
                  <th className="px-6 py-4 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filter && filter.length > 0 ? (
                  filter.map((item) => (
                    <tr key={item._id} className="hover:bg-black transition-colors duration-300">
                      <td className="px-6 py-4 border-b text-gray-200">{item.amount}</td>
                      <td className="px-6 py-4 border-b text-gray-200">{item.source}</td>
                      <td className="px-6 py-4 border-b text-gray-200">{item.dateReceived}</td>
                      <td className="px-6 py-4 border-b text-gray-200">{item.category}</td>
                      <td className="px-6 py-4 border-b text-gray-200">{item.notes}</td>
                      <td className="px-6 py-4 border-b text-center">
                        <Link to={`/iupdate/${item._id}`}>
                          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td className="px-6 py-4 border-b text-center">
                        <button
                          onClick={() => {
                            setformId(item._id);
                            handleDeleteUser();
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-500 py-4">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

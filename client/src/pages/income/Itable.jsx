import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  console.log(Info)
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser._id)
  const customerId = currentUser ? currentUser._id : null;
 
  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/incomes/Items/${customerId}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setInfo(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, [customerId]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["amount", "source", "dateReceived", "category", "notes"]],
      body: filter.map((course) => [
        course.amount,
        course.source,
        course.dateReceived,
        course.category,
        course.notes,
       
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 0, 255] }
    });
    doc.save("income.pdf");
  };
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/incomes/delete/${DId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setInfo((prev) => prev.filter((course) => course._id !== DId));
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
        (course) =>
          course.category &&
        course.category.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  return (
    <div className="h-[800px] relative bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/14856610/pexels-photo-14856610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-black opacity-50"></div>
  
    <div className="items-center justify-center flex relative z-10">
      <div className="items-center mt-20">
        
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
          <div>
            <button
              onClick={generatePDF}
              className="mt-4 bg-blue-600 font-serif text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Download PDF
          </button>
          </div>
          <div>
            <Link to={`/Iadd`}>
              <button
                className="mt-4 bg-blue-600 font-serif text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Add Income
              </button>
            </Link>
          </div>
        </div>

          <Link to={`/dash`} className="text-md text-gray-400 hover:text-blue-400 underline flex items-center">
          <FaArrowLeft className="mr-2" /> {/* Add left arrow icon */}
         
        </Link>

  
        {/* Table Create */}
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
                  filter.map((course) => (
                    <tr
                      key={course._id}
                      className="hover:bg-black transition-colors duration-300"
                    >
                      <td className="px-6 py-4 border-b text-gray-200">{course.amount}</td>
                      <td className="px-6 py-4 border-b text-gray-200">{course.source}</td>
                      <td className="px-6 py-4 border-b text-gray-200">{course.dateReceived}</td>
                      <td className="px-6 py-4 border-b text-gray-200">{course.category}</td>
                      <td className="px-6 py-4 border-b text-gray-200">{course.notes}</td>
  
                      <td className="px-6 py-4 border-b text-center">
                        <Link to={`/iupdate/${course._id}`}>
                          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                            EDITE
                          </button>
                        </Link>
                      </td>
                      <td className="px-6 py-4 border-b text-center">
                        <button
                          onClick={() => {
                            setformId(course._id);
                            handleDeleteUser();
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-red-500 py-4">
                      NO RECORDS FOUND
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

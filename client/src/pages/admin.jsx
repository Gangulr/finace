import { Spinner,  } from "flowbite-react";
import { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSilce";
import girl from "../img/img.jpg";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("http://localhost:3000/api/auth/asignin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return; // Ensure you return here to prevent further actions
      }

      dispatch(signInSuccess(data));
      navigate("/adminview");
    } catch (error) {
      dispatch(signInFailure("An error occurred. Please try again."));
    }
  };

  return (
    <div className="relative h-[800px]">
  {/* Background Image with Dark Overlay */}
  <img
    src="https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/wmremove-transformed.png?alt=media&token=6d934c84-4025-45c6-b8f3-c2bb7498e384"
    alt="Background Image"
    className="w-full h-full object-cover"
  />

  <div className="absolute top-1 flex justify-center items-center w-full h-full">
    <div className="">
     

      {/* Form Container */}
      <div className="bg-opacity-80 bg-black w-[480px] md:w-[550px] lg:w-[550px] h-auto mt-8 max-w-3xl mx-auto rounded-3xl  p-8">
        <div className="flex justify-center items-center">
          <div className=" w-full">
            <div className="flex justify-center items-center">
                <div className="text-white font-serif">
                    <h>Admin</h>
                </div>
            </div>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <h3 className="font-semibold text-gray-200 ml-1">Email</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 border-white p-4 border-opacity-50 rounded-lg w-full h-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handlchange}
                />
              </div>

              {/* Password Input */}
              <div>
                <h3 className="font-semibold text-gray-200 opacity-70 ml-1">Password</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 border-white p-4 border-opacity-50 rounded-lg w-full h-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handlchange}
                />
              </div>

              {/* Submit Button */}
              <button
                className="bg-blue-600 text-white p-4 rounded-lg w-full h-12 mt-6 hover:bg-blue-700 transition-all duration-300 focus:outline-none"
                type="submit"
                disabled={loading}
              >
                 {loading ? (
                <span className="lloading-text">Loading...</span>
              ) : (
                <div className="lsubmit-button">SIGN IN</div>
              )}
              </button>
            </form>


            {/* Error Message */}
            {errorMessage && (
              <p className="mt-5 text-red-600 bg-red-200 p-4 rounded-lg text-center">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
}

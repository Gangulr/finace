import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSilce"; // Import the action to handle sign-out

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux state
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="flex items-center p-4 bg-black fixed top-0 w-full z-50 opacity-50 shadow-md">
      <img 
        src="https://img.freepik.com/free-vector/abstract-graphic-logo_1043-36.jpg?t=st=1742379588~exp=1742383188~hmac=aacac308fa297c4d452fe1b92570a37e33dd2e1ff885aa66fec36bc08bf6321d&w=826" 
        alt="Logo" 
        className="pt-2 h-14" 
      />

      <div className="ml-64 flex gap-6 pt-4">
        {[
          { name: "Home", path: "/" },
          { name: "Budgeting", path: "/" },
          { name: "Investments",  },
          { name: "Savings",  },
          { name: "Account",  },
          { name: "OpenAirActivity"},
          // Conditionally render "Dashboard" link if currentUser is logged in
          currentUser && { name: "Dashboard", path: "/dash" }, 
          { name: "Register", path: "/sign-up" },
        ]
          .filter(Boolean) // Remove undefined value from the array
          .map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className={`text-lg font-bold text-white hover:text-[#ffa34c] ${activeLink === path ? 'text-[#ffa34c]' : ''}`}
              onClick={() => handleLinkClick(path)}
            >
              {name}
            </Link>
          ))}
      </div>

      <div className="ml-auto mt-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-3 border rounded-md border-gray-300 focus:border-[#ffa229] focus:outline-none w-36"
        />
      </div>

      <div className="flex items-center gap-8 ml-5 mt-4">
        <a href="#" className="text-2xl text-black hover:text-[#ffa34c]">
          <i className="fa fa-instagram"></i>
        </a>
        <a href="#" className="text-2xl text-black hover:text-[#ffa34c]">
          <i className="fa fa-facebook"></i>
        </a>
      </div>

      {/* Conditionally render based on currentUser */}
      {currentUser ? (
        <div className="flex items-center ml-auto">
          <Link to="/profile" className="flex items-center">
            <img
              src={currentUser.profilePicture}
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <button
            onClick={handleSignout}
            className="text-white px-3 py-1 rounded-lg text-base md:text-lg font-serif hover:bg-blue-800 transition"
          >
            LogOut
          </button>
        </div>
      ) : (
       <>
       </>
      )}
    </nav>
  );
};

export default Header;

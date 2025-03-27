import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        {/* Menu Section */}
        <div className="flex-1 min-w-[200px] mb-5">
          <h3 className="mb-4 text-[#ffa34c] text-lg font-bold">MENU</h3>
          <a href="" className="block mb-2 hover:text-[#ffa34c]">Dashboard</a>
          <a href="" className="block mb-2 hover:text-[#ffa34c]">Transactions</a>
          <a href="" className="block mb-2 hover:text-[#ffa34c]">Budgeting</a>
          <a href="/" className="block mb-2 hover:text-[#ffa34c]">Investments</a>
          <a href="/" className="block mb-2 hover:text-[#ffa34c]">Reports</a>
          <a href="/" className="block mb-2 hover:text-[#ffa34c]">Savings Goals</a>
        </div>

        {/* Support Section */}
        <div className="flex-1 min-w-[200px] mb-5">
          <h3 className="mb-4 text-[#ffa34c] text-lg font-bold">SUPPORT</h3>
          <a href="" className="block mb-2 uppercase hover:text-[#ffa34c]">Financial Planning</a>
          <a href="" className="block mb-2 hover:text-[#ffa34c]">Account Overview</a>
          <a href="" className="block mb-2 hover:text-[#ffa34c]">Help & Support</a>
          <a href="" className="block mb-2 hover:text-[#ffa34c]">Submit a Request</a>
          <a href="" className="block mb-2 hover:text-[#ffa34c]">Returns & Exchanges</a>
        </div>

        {/* Community Section */}
        <div className="flex-1 min-w-[200px] mb-5">
          <h3 className="mb-4 text-[#ffa34c] text-lg font-bold">Join the Community!</h3>
          <p className="mb-5">
            Drop your email address and join our financial community. We don't spam—just useful tips and updates on new features and offers.
          </p>
          <input 
            type="email" 
            placeholder="Email address" 
            className="p-2 rounded border-none w-full"
          />
          <button className="mt-2 bg-[#ffa34c] text-white py-2 px-4 rounded hover:bg-[#ff6f30]">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-5 flex justify-between items-end flex-wrap">
        <div className="flex space-x-4">
          <a href="#" className="text-2xl hover:text-[#ffa34c]">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="#" className="text-2xl hover:text-[#ffa34c]">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" className="text-2xl hover:text-[#ffa34c]">
            <i className="fa fa-twitter"></i>
          </a>
        </div>

        <p className="text-center mb-2 mt-5">
          &copy; 2024 Finance Management System. <br />
          Designed & Developed by <strong>0023</strong>
        </p>

        <div>
          <img src="https://img.freepik.com/free-vector/abstract-graphic-logo_1043-36.jpg?t=st=1742379588~exp=1742383188~hmac=aacac308fa297c4d452fe1b92570a37e33dd2e1ff885aa66fec36bc08bf6321d&w=826" alt="Logo" className="h-20" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

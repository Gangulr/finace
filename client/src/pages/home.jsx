import React from 'react';

export default function Home() {
  return (
    <div className="bg-gray-900  text-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r  from-[#0A1F44] to-[#1F3A63]  text-white py-20">
        <div className="max-w-6xl mx-auto text-center relative mt-52 z-10">
          <h2 className="text-5xl font-bold mb-4  drop-shadow-lg">Welcome to Our Finora: Your Finance Hub</h2>
          <p className="mb-8 text-lg  drop-shadow-md">
            Simplifying financial decisions with real-time analytics and secure management tools.
          </p>
          <a
            href="#book"
            className="bg-[#FFB400] text-gray-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
        <div className="absolute inset-0 bg-[url('https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/wmremove-transformed%20(2).png?alt=media&token=2b7d403f-1126-40d5-9928-7dc8a0ae2f34')] bg-cover bg-center opacity-40"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 mt-32">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-yellow-500">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Budget Management Feature */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="https://images.pexels.com/photos/4813907/pexels-photo-4813907.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Budget Management" className="w-full h-48 rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-4">Budget Management</h3>
              <p>Efficiently manage your budgets and set spending limits to take control of your finances.</p>
            </div>

            {/* Expense Management Feature */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Expense Management" className="w-full h-48 rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-4">Expense Management</h3>
              <p>Track your expenses and optimize spending for better financial control.</p>
            </div>

            {/* Income Management Feature */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="https://img.freepik.com/free-photo/dollar-banknotes-leather-men-s-wallet-brown-wooden-table_8353-6551.jpg?t=st=1742378904~exp=1742382504~hmac=7097a64f6f2d3985625a57ae3b48530e32dbf9dcaf83b74493c6138bddfc2047&w=1380" alt="Income Management" className="w-full h-48 rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-4">Income Management</h3>
              <p>Keep track of your income sources and analyze your financial growth.</p>
            </div>

            {/* Chatbot Feature */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="https://img.freepik.com/free-photo/doll-looking-two-buttons_1048-2676.jpg?t=st=1742379032~exp=1742382632~hmac=20ca1e60e0230b2163d49b83944b0279f1612cc496d8893880dbd28b9739285b&w=826" alt="Chatbot for Analysis" className="w-full h-48 rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-4">Chatbot for Analysis</h3>
              <p>Use our AI-powered chatbot to analyze past records and optimize future decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* Services Section */}
<section 
  id="services" 
  className="bg-cover bg-center py-28" 
  style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/wmremove-transformed%20(3).png?alt=media&token=3a948fad-0e21-4da4-94fc-15fea938de90')" }}
>
  <div className="max-w-7xl mx-auto text-center px-6 bg-black bg-opacity-50 p-10 rounded-xl">
    <h2 className="text-4xl font-extrabold text-yellow-500 mb-6">Our Professional Services</h2>
    <p className="text-xl text-gray-300 mb-12">Providing essential tools to manage your finances efficiently and in real-time.</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {/* Budget Management Service */}
      <div className="bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
        <img 
          src="https://img.freepik.com/free-photo/woman-thinking-about-new-design_171337-15545.jpg?t=st=1742378911~exp=1742382511~hmac=aa48aa5c5fc186b561bfd478be703cda96a52a662846d99f3b661428ef26f9af&w=1380" 
          alt="Budget Management" 
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
        <h3 className="text-2xl font-semibold text-white mb-4">Budget Management</h3>
        <p className="text-gray-200">Effortlessly track your income, set budgets, and monitor your spending habits for better financial health.</p>
      </div>

      {/* Income Tracking Service */}
      <div className="bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
        <img 
          src="https://img.freepik.com/free-photo/portrait-happy-rich-businessman-carrying-briefcase-full-dollar-bills-looking-back-isolated-dark-gray_171337-595.jpg?t=st=1742378819~exp=1742382419~hmac=35ec09dc31a135cf5dd9fa39c6758d8deb632e0bd6079d09b913519d75f03c54&w=1380" 
          alt="Income Tracking" 
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
        <h3 className="text-2xl font-semibold text-white mb-4">Income Tracking</h3>
        <p className="text-gray-200">Stay on top of all your income sources and visualize your cash flow for accurate budgeting.</p>
      </div>

      {/* Expense Tracking Service */}
      <div className="bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
        <img 
          src="https://img.freepik.com/free-photo/front-view-woman-holding-tablet_23-2151027611.jpg?t=st=1742378886~exp=1742382486~hmac=aaa16fd56b2e4e2535b450d51331851bd1e9e1f26ecf7fc9a485ce3fa7607531&w=826" 
          alt="Expense Tracking" 
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
        <h3 className="text-2xl font-semibold text-white mb-4">Expense Tracking</h3>
        <p className="text-gray-200">Easily track your daily expenses and categorize them for a clearer picture of where your money is going.</p>
      </div>

      {/* Real-Time Chatbot Service */}
      <div className="bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
        <img 
          src="https://img.freepik.com/free-photo/doll-looking-two-buttons_1048-2676.jpg?t=st=1742379032~exp=1742382632~hmac=20ca1e60e0230b2163d49b83944b0279f1612cc496d8893880dbd28b9739285b&w=826" 
          alt="Real-Time Chatbot" 
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
        <h3 className="text-2xl font-semibold text-white mb-4">Real-Time Chatbot</h3>
        <p className="text-gray-200">Get instant financial advice, answers to questions, and personalized recommendations 24/7 with our AI-powered chatbot.</p>
      </div>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-yellow-500">Get in Touch</h2>
          <p className="mb-4">Have any questions or want to know more? Reach out to us!</p>
          <a href="mailto:info@financemgmt.com" className="bg-[#FFB400] text-gray-900 px-6 py-3 rounded-full hover:bg-yellow-500">
            Email Us
          </a>
        </div>
      </section>
    </div>
  );
}

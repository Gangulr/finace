import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const userid = currentUser ? currentUser._id : null;

  const handleSend = async () => {
    const newMessages = [...messages, { user: "You", text: input }];
    setMessages(newMessages);

    const userInput = input.toLowerCase();

    try {
      let formattedMessage = "";

      // Handle greetings
      if (userInput.includes("hi") || userInput.includes("hello")) {
        formattedMessage = "Hi, I'm Uma! How can I assist you today? You can ask for your past details like income, expense, or budget.";
      } else if
        (userInput.includes("ok") || userInput.includes("how i do that")) {
          formattedMessage = " You can ask for your past details like income, expense, or budget.";

      }else if (userInput.includes("thank you") || userInput.includes("it work")) {
        formattedMessage = "Happy to help!";

    }
      
      else if (userInput.includes("budget") || userInput.includes("past budget") ) {
        formattedMessage = await getPastDetails("budget");
      } else if (userInput.includes("income") || userInput.includes("past income") ) {
        formattedMessage = await getPastDetails("income");
      } else if (userInput.includes(" expense") || userInput.includes("past expense") ) {
        formattedMessage = await getPastDetails("expense");
      } else {
        formattedMessage = "I'm not sure what you're asking. Please ask about past details like income, expense, or budget.";
      }

      // Add response to messages
      setMessages([...newMessages, { user: "Reply", text: formattedMessage }]);
    } catch (error) {
      setMessages([...newMessages, { user: "Reply", text: "Sorry, there was an error processing your request." }]);
    }

    setInput("");
  };

  // Fetch and format past details
  const getPastDetails = async (type) => {
    const [category, month] = input.split(","); // Split input for month details
    const url = `/api/auth/${type}/${userid}/${month}`;
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return `I don't have the data for the past month's ${type}.`;
      }

      const data = await response.json();
      return formatResponse(data);
    } catch (error) {
      return `Error fetching the data for the past month's ${type}.`;
    }
  };

  // Format response data in a user-friendly way
  const formatResponse = (data) => {
    if (!Array.isArray(data) || data.length === 0) return "No data found.";

    return data.map(item => {
      let message = `\nCategory: ${item.category}\n`;

      if (item.amount) message += `Amount: $${item.amount}\n`;
      if (item.source) message += `Source: ${item.source}\n`;
      if (item.dateReceived) message += `Date Received: ${item.dateReceived}\n`;
      if (item.dateSpent) message += `Date Spent: ${item.dateSpent}\n`;
      if (item.notes) message += `Notes: ${item.notes}\n`;

      return message;
    }).join("\n");
  };

  return (
    <div className="bg-cover bg-center h-screen" 
         style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/wmremove-transformed%20(1).png?alt=media&token=e93cd503-e78d-4cd8-8021-0e26a707efff')" }}>
      <div className="flex justify-center items-center h-full">
        <Link to={`/dash`} className="text-md text-gray-400 hover:text-blue-400 underline flex items-center">
          <FaArrowLeft className="mr-2" />
        </Link>
        <div className="flex flex-col w-full h-[80%] max-w-md mt-24 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex-grow p-6 space-y-4 overflow-y-auto scrollbar-hide bg-stone-900 bg-opacity-90 rounded-lg">
            {messages.map((message, index) => (
              <div key={index} className={`flex flex-col ${message.user === "You" ? "items-end" : "items-start"}`}>
                <div className={`inline-block p-3 rounded-lg max-w-xs ${message.user === "You" ? "bg-blue-700 text-white" : "bg-gray-700 text-white"}`}>
                  <strong>{message.user}:</strong>
                  <span className="ml-1 whitespace-pre-wrap">{message.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-900 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;

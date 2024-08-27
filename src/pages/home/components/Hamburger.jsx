import React, { useState } from 'react';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const userName = "Vaibhav"; // Replace with dynamic data
  const monthlyExpenses = "$1500"; // Replace with dynamic data

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <div 
        className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-4 flex flex-col justify-between">
          <span className="block w-full h-1 bg-white rounded-sm"></span>
          <span className="block w-full h-1 bg-white rounded-sm"></span>
          <span className="block w-full h-1 bg-white rounded-sm"></span>
        </div>
      </div>

      {/* Pop-up Window */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-2">User Details</h2>
          <p className="text-gray-700 mb-1"><strong>Name:</strong> {userName}</p>
          <p className="text-gray-700 mb-4"><strong>Monthly Expenses:</strong> {monthlyExpenses}</p>
          <button
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            onClick={() => alert('Logging out...')} // Replace with actual log-out functionality
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;

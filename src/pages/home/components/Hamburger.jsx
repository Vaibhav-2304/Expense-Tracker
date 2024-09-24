import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from "prop-types";
import Auth from "../../../services/auth_api";

function HamburgerMenu({userName}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMonthlyClick = () => {
    navigate("/previous-months");
  };

  const handleYearlyClick = () => {
    navigate("/previous-years");
  };

  const handleLogOut = async () => {
    await new Auth().logout().then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

  return (
    <div className="relative mr-4">
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
          <p className="text-gray-700 mb-4"><strong>Welcome</strong> {userName}</p>
          
          <button className='p-2 w-full border-2 border-slate-700 rounded-lg shadow-lg mb-4 hover:bg-slate-700 hover:text-white transition-all duration-500 ease-in-out'
          onClick={handleMonthlyClick}
          >
            View Monthly Data
          </button>

          <button className='p-2 w-full border-2 border-slate-700 rounded-lg shadow-lg mb-4 hover:bg-slate-700 hover:text-white transition-all duration-500 ease-in-out'
          onClick={handleYearlyClick}
          >
            View Yearly Data
          </button>
          
          <button
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            onClick={handleLogOut} 
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

HamburgerMenu.propTypes = {
  userName: PropTypes.string.isRequired,
}

export default HamburgerMenu;

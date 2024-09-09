import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import PreviousMonthDataPage from './pages/previousMonth/PreviousMonthData';
import PreviousYearDataPage from './pages/previousYear/PreviousYearData';


const chekLogin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
      return false;
  }
  return true;
};

// Set isLoggedIn based on token validity
const isLoggedIn = chekLogin();

const router = createBrowserRouter([
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          path: '',
          element: isLoggedIn ? <HomePage /> : <Navigate to="/login" />
        },
        {
          path: 'login',
          element: isLoggedIn ? <Navigate to="/" /> : <LoginPage />
        },
        {
          path: "register",
          element: <RegisterPage />
        },
        {
          path: 'previous-months',
          element: <PreviousMonthDataPage/>
        },
        {
          path: 'previous-years',
          element: <PreviousYearDataPage/>
        },
      ]
    }
  ]);
  
  export default router;
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';

var isLoggedIn = true;

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
        }
      ]
    }
  ]);
  
  export default router;
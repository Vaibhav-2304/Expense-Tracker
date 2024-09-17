import { useState } from "react";
import Auth from "../../services/auth_api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from 'react-lottie-player'
import walletAnimation from "../../assets/wallet.json";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await new Auth().login(email, password);
    if (success) {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-700">
          Expense Tracker
        </h1>
        <Lottie
          play
          animationData={walletAnimation}
          loop
          style={{ width: 100, height: 100 }}
          speed={2}
        />
      </div>
      <div className="bg-black bg-opacity-10 backdrop-blur-xl p-8 rounded-lg shadow-md w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 mt-6"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <div className="flex align-middle items-center justify-center">
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm font-semibold">
            Don&apos;t have an account?{" "}
            <button className="text-black font-semibold hover:font-bold" onClick={()=>(window.location.href = "/register")}>
            Register Now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

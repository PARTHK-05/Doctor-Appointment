import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminCotext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      let response;

      if (state === 'Admin') {
        response = await axios.post(`${backendUrl}/admin/login`, user);
        if (response.status === 200) {
          setAToken(response.data.token);
          localStorage.setItem("atoken", response.data.token);
          toast.success("Admin Login Successfully");
        } else toast.error(response.data.message);
      } else {
        response = await axios.post(`${backendUrl}/doctor/login`, user);
        if (response.status === 200) {
          setDToken(response.data.token);
          localStorage.setItem("dtoken", response.data.token);
          toast.success("Doctor Login Successfully");
        } else toast.error(response.data.message);
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex flex-1 justify-center items-center px-6 py-10">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Welcome Back 👋</h1>
          <p className="text-gray-600 mb-6 text-center">
            Log in to access your account and continue your journey toward better health.
          </p>

          <form onSubmit={OnSubmitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39E079]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39E079]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#39E079] text-white font-semibold py-3 rounded-full hover:bg-[#2ecc71] transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {state === 'Admin' ? (
              <>Doctor Login?{" "}
                <span className="text-[#39E079] underline cursor-pointer" onClick={() => setState('Doctor')}>
                  Click here
                </span>
              </>
            ) : (
              <>Admin Login?{" "}
                <span className="text-[#39E079] underline cursor-pointer" onClick={() => setState('Admin')}>
                  Click here
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:block flex-1">
        <img
          src="https://thumbs.dreamstime.com/b/d-style-cute-cartoon-character-medical-doctor-against-bright-color-background-ai-generated-306957904.jpg"
          alt="Doctor Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

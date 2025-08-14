import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const {backendUrl , token , setToken , setUser } = useContext(AppContext)
    
    const OnSubmitHandler= async(e)=>{
        e.preventDefault();
        const user={
            email,password
        };
        
        try {
            const response = await axios.post(backendUrl+'/users/login',user,{
                headers: {
                  'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            console.log(data)
    
            if(response.status==201 || response.status==200){
              localStorage.setItem('token',data.token)
              setToken(data.token)
              localStorage.setItem('user',data.user._id)
              setUser(data.user)
              toast.success("User Succesfully Register")
              setEmail('');
              setpassword('');
              navigate('/');
            }else{
              console.log(response)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }


  return (
    <div className="w-full min-h-screen flex">

      <div className="w-1/2 flex flex-col justify-center px-16">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back 👋</h1>
          <p className="text-gray-600 mb-8 text-base">
            Log in to access your account and continue your journey toward better health.
          </p>
          <form onSubmit={OnSubmitHandler}  className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39E079]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39E079]"
              />
            </div>
            <button
              type="submit"
              
              className="bg-[#39E079] text-white font-semibold py-3 rounded-full hover:bg-[#2ecc71] transition duration-300"
            >
              Log in
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-[#39E079] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

   
      <div className="w-1/2 h-screen">
        <img
          src="https://thumbs.dreamstime.com/b/d-style-cute-cartoon-character-medical-doctor-against-bright-color-background-ai-generated-306957904.jpg"
          alt="Doctor Illustration"
          className="w-full h-full object-cover "
        />
      </div>
    </div>
  );
};

export default Login;

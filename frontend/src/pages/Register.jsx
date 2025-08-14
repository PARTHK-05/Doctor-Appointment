import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {AppContext} from '../context/AppContext'
import AppContextProvider from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {backendUrl} = useContext(AppContext)

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    const user = {
      firstname:firstName,
      lastname:lastName,
      email,
      password,
    };

    try {
        const response = await axios.post(backendUrl+'/users/register',user,{
            headers: {
              'Content-Type': 'application/json',
            }
        });

        if(response.status==201 || response.status==200){
          console.log(response.data)
          console.log(response.token)

          toast.success("User Succesfully Register")
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
        }else{
          console.log(response)
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error.message)
    }
  };

  return (
    <div className="w-full min-h-screen flex">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden md:block">
        <img
          src="https://cdn.pixabay.com/photo/2025/03/24/15/10/ai-generated-9490956_1280.png"
          alt="Doctor Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Create Account 👤</h1>
          <p className="text-gray-600 mb-8 text-base">
            Register to access personalized healthcare services and manage your appointments easily.
          </p>
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39E079]"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39E079]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39E079]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39E079]"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#39E079] text-white font-semibold py-3 rounded-full hover:bg-[#2ecc71] transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#39E079] font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

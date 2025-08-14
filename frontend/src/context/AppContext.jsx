import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {toast}  from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : localStorage.getItem(''))

  const [user, setUser] = useState(localStorage.getItem('user')? localStorage.getItem('user') : localStorage.getItem(''))

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/doctor/all_doctors`,{

      });
      console.log(data.doctors)
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  
    useEffect(()=>{
        getDoctorsData()
    },[])

  const value = {
    doctors,
    currencySymbol,
    getDoctorsData,
    backendUrl,
    token,
    setToken,
    user,setUser,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

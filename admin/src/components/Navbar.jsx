import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminCotext';
import { DoctorContext } from '../context/DoctorContext';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { assets } from '../assets/assets';

const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext);
  const { dtoken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const [mobileNav, setMobileNav] = useState(false);

  const logout = () => {
    navigate('/');
    atoken && setAToken('');
    dtoken && setDToken('');
    atoken && localStorage.removeItem('atoken');
    dtoken && localStorage.removeItem('dtoken');
    setMobileNav(false);
  };

  return (
    <nav className="w-full h-20 px-6 md:px-10 py-2 flex justify-between items-center bg-gradient-to-r  from-emerald-50/2 bg-green-200 via-white to-teal-50">
 
      <div className="flex items-center gap-3 font-bold text-2xl ">
        <Link to="/">HealthFirst</Link>
        <p className="text-xs px-3 py-1 border-2 border-black  rounded-full">
          {atoken ? 'Admin' : 'Doctor'}
        </p>
      </div>


      <div className="md:hidden">
        <button onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>


      <div className="hidden md:block">
        <button
          onClick={logout}
          className="px-6 py-2 text-sm rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 transition"
        >
          Logout
        </button>
      </div>

      {mobileNav && (
        <div className="absolute top-20 left-0 w-full bg-white flex flex-col items-center py-6 shadow-md md:hidden z-40">
   
          {atoken && (
            <ul className="w-full text-[#515151]">
              <NavLink
                to="/admin-dashboard"
                className="flex items-center gap-3 px-6 py-3 hover:bg-green-50"
                onClick={() => setMobileNav(false)}
              >
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
              </NavLink>
              <NavLink
                to="/all-appointments"
                className="flex items-center gap-3 px-6 py-3 hover:bg-green-50"
                onClick={() => setMobileNav(false)}
              >
                <img src={assets.appointment_icon} alt="" />
                <p>Appointments</p>
              </NavLink>
              <NavLink
                to="/add-doctor"
                className="flex items-center gap-3 px-6 py-3 hover:bg-green-50"
                onClick={() => setMobileNav(false)}
              >
                <img src={assets.add_icon} alt="" />
                <p>Add Doctor</p>
              </NavLink>
              <NavLink
                to="/doctor-list"
                className="flex items-center gap-3 px-6 py-3 hover:bg-green-50"
                onClick={() => setMobileNav(false)}
              >
                <img src={assets.people_icon} alt="" />
                <p>Doctor List</p>
              </NavLink>
            </ul>
          )}

    
          {dtoken && (
            <ul className="w-full text-[#515151]">
              <NavLink
                to="/doctor-dashboard"
                className="flex items-center gap-3 px-6 py-3 hover:bg-green-50"
                onClick={() => setMobileNav(false)}
              >
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
              </NavLink>
              <NavLink
                to="/doctor-appointments"
                className="flex items-center gap-3 px-6 py-3 hover:bg-green-50"
                onClick={() => setMobileNav(false)}
              >
                <img src={assets.appointment_icon} alt="" />
                <p>Appointments</p>
              </NavLink>
              <NavLink
                to="/doctor-profile"
                className="flex items-center gap-3 px-6 py-3 hover:bg-green-50"
                onClick={() => setMobileNav(false)}
              >
                <img src={assets.people_icon} alt="" />
                <p>Profile</p>
              </NavLink>
            </ul>
          )}

     
          <button
            onClick={logout}
            className="mt-5 px-6 py-2 text-sm rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

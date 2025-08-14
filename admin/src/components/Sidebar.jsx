import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminCotext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return (
    <div className="hidden md:block px-2 min-h-screen border-r-green-300 shadow-2xl shadow-green-300 bg-white">
      {atoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2f3ff] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2f3ff] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2f3ff] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2f3ff] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt="" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}

      {dtoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2f3ff] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2f3ff] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2f3ff] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt="" />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

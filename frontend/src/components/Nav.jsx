import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ChevronDown, Menu, X } from 'lucide-react';

const Nav = () => {
  const location = useLocation();
  const { token, setToken , setUser } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const logout = () => {
    setToken('');
    setUser('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowMenu(false);
    setMobileNav(false);
  };

  return (
    <nav className="w-full h-20 px-6 md:px-10 py-1 flex justify-between items-center shadow-2xl fixed top-0 z-50 bg-gradient-to-r  from-emerald-50/2 bg-green-200 via-white to-teal-50">
      <div className="text-2xl font-bold">
        <Link to="/">HealthFirst</Link>
      </div>

      <div className="md:hidden">
        <button onClick={() => setMobileNav(prev => !prev)}>
          {mobileNav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-5 w-1/2 justify-end relative">
        <Link to="/find-doctors"><h3 className="cursor-pointer hover:underline">Find a doctor</h3></Link>
        {location.pathname === '/' ? (
          <a href="#about-us"><h3 className="cursor-pointer hover:underline">About us</h3></a>
        ) : (
          <Link to="/#about-us"><h3 className="cursor-pointer hover:underline">About us</h3></Link>
        )}
        {location.pathname === '/' ? (
          <a href="#Contact"><h3 className="cursor-pointer hover:underline">Contact</h3></a>
        ) : (
          <Link to="/#Contact"><h3 className="cursor-pointer hover:underline">Contact</h3></Link>
        )}
        {!token ? (
          <>
            <Link to="/login">
              <button className="px-5 py-2 text-sm rounded-full font-semibold bg-[#39E079]">Login</button>
            </Link>
            <Link to="/register">
              <button className="px-5 py-2 text-sm rounded-full font-semibold bg-[#39E079]">Sign up</button>
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              className="flex items-center gap-2 px-5 py-2 text-sm rounded-full font-semibold bg-[#39E079]"
              onClick={() => setShowMenu(prev => !prev)}
            >
              Account <ChevronDown size={16} />
            </button>
            {showMenu && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-2 z-20 min-w-[160px]">
                <Link to="/profile" onClick={() => setShowMenu(false)} className="block px-4 py-2 text-sm hover:bg-gray-100 rounded text-black">My Profile</Link>
                <Link to="/my-appointments" onClick={() => setShowMenu(false)} className="block px-4 py-2 text-sm hover:bg-gray-100 rounded text-black">My Appointments</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      {mobileNav && (
        <div className="absolute top-20 left-0 w-full bg-white flex flex-col items-center gap-5 py-6 shadow-md md:hidden z-40">
          <Link to="/find-doctors" onClick={() => setMobileNav(false)}><h3 className="cursor-pointer">Find a doctor</h3></Link>
          {location.pathname === '/' ? (
            <a href="#about-us" onClick={() => setMobileNav(false)}><h3 className="cursor-pointer">About us</h3></a>
          ) : (
            <Link to="/#about-us" onClick={() => setMobileNav(false)}><h3 className="cursor-pointer">About us</h3></Link>
          )}
          {location.pathname === '/' ? (
            <a href="#Contact" onClick={() => setMobileNav(false)}><h3 className="cursor-pointer">Contact</h3></a>
          ) : (
            <Link to="/#Contact" onClick={() => setMobileNav(false)}><h3 className="cursor-pointer">Contact</h3></Link>
          )}
          {!token ? (
            <>
              <Link to="/login" onClick={() => setMobileNav(false)}>
                <button className="px-5 py-2 text-sm rounded-full font-semibold bg-[#39E079]">Login</button>
              </Link>
              <Link to="/register" onClick={() => setMobileNav(false)}>
                <button className="px-5 py-2 text-sm rounded-full font-semibold bg-[#39E079]">Sign up</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={() => setMobileNav(false)} className="text-sm">My Profile</Link>
              <Link to="/my-appointments" onClick={() => setMobileNav(false)} className="text-sm">My Appointments</Link>
              <button onClick={logout} className="text-sm text-red-600">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;

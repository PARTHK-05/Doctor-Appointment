import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import { toast } from 'react-hot-toast';

const FindDoctor = () => {
  const { doctors, token } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isAllDoctorsPage = location.pathname === '/find-doctors';
  const [visibleCount, setVisibleCount] = useState(isAllDoctorsPage ? doctors.length : 6);

  useEffect(() => {
    setVisibleCount(isAllDoctorsPage ? doctors.length : 6);
  }, [isAllDoctorsPage, doctors.length]);

  const handleShowMore = () => {
    navigate('/find-doctors');
  };

  const handleCardClick = (id) => {
    if (!token) {
      toast.error('Login to check the details of the doctor');
    } else {
      navigate(`/book-appointment/${id}`);
    }
  };

  return (
    <>
      <div className='w-full '>
        <Nav />
      </div>

      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 pt-30 py-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {doctors.slice(0, visibleCount).map((doc, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(doc._id)}
                className="cursor-pointer group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-emerald-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={doc?.profilePic}
                    alt={doc?.fullname?.firstname}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow backdrop-blur-sm">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Available
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {doc?.fullname?.firstname}
                    </h2>
                    <p className="text-emerald-600 font-semibold text-sm bg-emerald-50 px-3 py-1 rounded-full inline-block">
                      {doc?.speciality}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-800">{doc?.degree}</p>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-800">{doc?.experience}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isAllDoctorsPage && visibleCount < doctors.length && (
            <div className="flex justify-center mt-12 gap-4">
              <button
                onClick={handleShowMore}
                className="group relative px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  Show More Doctors
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FindDoctor;

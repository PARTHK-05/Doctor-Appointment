import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../context/AdminCotext';

const DoctorsList = () => {
  const [search, setSearch] = useState('');
  const { atoken, getAllDoctors, doctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  const filteredDoctors = doctors.filter((doc) => {
    const fullName = `${doc.fullname.firstname} ${doc.fullname.lastname}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleAvailabilityChange = (id) => {
    changeAvailability(id);
  };

  return (
    <div className="w-full min-h-screen px-6 md:px-10 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Find A Doctor 👨‍⚕️</h1>

      <div className="max-w-xl mx-auto mb-12">
        <form
          className="flex items-center bg-white shadow-sm rounded-full px-4 py-2 border border-gray-300 focus-within:ring-2 focus-within:ring-green-500"
          onSubmit={(e) => e.preventDefault()}
        >
          <svg
            className="w-5 h-5 text-gray-500 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialty..."
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
          />
          <button
            type="submit"
            className="ml-3 px-4 py-2 bg-green-400 text-white text-sm rounded-full hover:bg-green-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredDoctors.map((doc, index) => (
          <div
            key={index}
            className="w-full bg-white flex flex-col md:flex-row justify-between items-start rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex flex-col md:flex-row items-center gap-5 w-full">
              <img
                src={doc.profilePic}
                alt={`${doc.fullname.firstname} ${doc.fullname.lastname}`}
                className=" w-45 object-cover rounded-r-xl border-r-2 shadow-xl shadow-green-300 border-r-green-600  hover:bg-green-300 transition"
              />
              <div className="flex-1 py-8 px-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {doc.fullname.firstname} {doc.fullname.lastname}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{doc.speciality}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {typeof doc.address === 'string'
                    ? doc.address
                    : Object.values(doc.address).join(', ')}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <label className="text-sm text-gray-700 font-medium">Available:</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={doc.available}
                      onChange={() => handleAvailabilityChange(doc._id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

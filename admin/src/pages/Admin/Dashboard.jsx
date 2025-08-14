import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminCotext';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { backendUrl, atoken } = useContext(AdminContext);
  const [dashData, setDashData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        });

        if (data.success) {
          setDashData(data.dashdata);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (atoken) {
      fetchData();
    }
  }, [atoken]);

  return (
    <div className="w-full min-h-screen px-6 md:px-10 py-10 bg-gray-50">

      {dashData && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <img src={assets.doctor_icon} alt="Doctors" className="w-14 h-14 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Doctors</h2>
                <p className="text-4xl font-bold text-green-600 mt-1">{dashData.doctors}</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <img src={assets.appointments_icon} alt="Appointments" className="w-14 h-14 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
                <p className="text-4xl font-bold text-green-600 mt-1">{dashData.appointments}</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <img src={assets.patients_icon} alt="Users" className="w-14 h-14 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Users</h2>
                <p className="text-4xl font-bold text-green-600 mt-1">{dashData.users}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Appointments 📅</h2>
            {dashData.latestAppointments.length === 0 ? (
              <p className="text-gray-500">No recent appointments.</p>
            ) : (
              <div className="overflow-auto">
                <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                  <thead className="bg-green-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Patient</th>
                      <th className="px-4 py-3 font-semibold">Doctor</th>
                      <th className="px-4 py-3 font-semibold">Speciality</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Time</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dashData.latestAppointments.map((appt) => {
                      const patientName = appt.userData?.fullname
                        ? `${appt.userData.fullname.firstname} ${appt.userData.fullname.lastname}`
                        : 'Unknown';

                      const doctorName = appt.docData?.fullname
                        ? `${appt.docData.fullname.firstname} ${appt.docData.fullname.lastname}`
                        : 'Unknown';

                      const speciality = appt.docData?.speciality || 'N/A';

                      const status = appt.cancelled
                        ? 'Cancelled ❌'
                        : appt.isCompleted
                        ? 'Completed ✅'
                        : 'Scheduled ⏳';

                      return (
                        <tr key={appt._id} className="hover:bg-green-50 transition">
                          <td className="px-4 py-3 text-gray-800">{patientName}</td>
                          <td className="px-4 py-3 text-green-800">{doctorName}</td>
                          <td className="px-4 py-3 text-gray-600">{speciality}</td>
                          <td className="px-4 py-3 text-gray-700">{appt.slotDate.replace(/_/g, '/')}</td>
                          <td className="px-4 py-3 text-gray-700">{appt.slotTime}</td>
                          <td className="px-4 py-3 font-medium">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                appt.cancelled
                                  ? 'bg-red-100 text-red-600'
                                  : appt.isCompleted
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

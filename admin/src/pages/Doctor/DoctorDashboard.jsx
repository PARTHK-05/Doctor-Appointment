import React, { useEffect, useState, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const { dtoken, backendUrl } = useContext(DoctorContext);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/doctor/dashboard`, {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        });

        if (data.success) {
          setDashboard(data.DashData);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (dtoken) {
      fetchData();
    }
  }, [dtoken]);

  if (!dashboard) return <div className="p-10 text-green-700 text-xl">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-white px-6 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm text-green-600">Total Appointments</h2>
          <p className="text-2xl font-semibold text-green-800 mt-2">{dashboard.appointments}</p>
        </div>
        <div className="bg-green-100 border border-green-300 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm text-green-700">Total Earnings</h2>
          <p className="text-2xl font-bold text-green-900 mt-2">₹{dashboard.earnings}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm text-green-600">Unique Patients</h2>
          <p className="text-2xl font-semibold text-green-800 mt-2">{dashboard.patients}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Latest Appointments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="text-left bg-green-100 text-green-800">
                <th className="py-2 px-3">Patient</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.latestAppointments.map((appt) => (
                <tr key={appt._id} className="border-b hover:bg-green-50 transition">
                  <td className="py-2 px-3">
                    {appt.userData?.fullname.firstname} {appt.userData?.fullname.lastname}
                  </td>
                  <td className="py-2 px-3">{appt.slotDate}</td>
                  <td className="py-2 px-3">{appt.slotTime}</td>
                  <td className="py-2 px-3">
                    {appt.cancelled ? (
                      <span className="text-red-500 font-medium">Cancelled</span>
                    ) : appt.isCompleted ? (
                      <span className="text-green-600 font-medium">Completed</span>
                    ) : (
                      <span className="text-yellow-500 font-medium">Upcoming</span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    {appt.cancelled ? (
                      <span className="text-red-500 font-semibold">–</span>
                    ) : appt.isCompleted && appt.payment ? (
                      <span className="text-green-600 font-semibold">+ ₹{appt.amount}</span>
                    ) : (
                      <span className="text-gray-500 font-medium">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
              {dashboard.latestAppointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No recent appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

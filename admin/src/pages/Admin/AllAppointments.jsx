import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../../context/AdminCotext';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

const AllAppointments = () => {
  const { backendUrl, atoken } = useContext(AdminContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/admin/all-appointments`, {
          headers: { Authorization: `Bearer ${atoken}` },
        });
        if (data.success) setAppointments(data.appointments);
        else toast.error(data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch appointments');
      }
    };
    if (atoken) fetchData();
  }, [atoken]);

  const handleCancel = async (id) => {
    try {
      const res = await axios.put(
        `${backendUrl}/admin/cancelled-appointmet`,
        { appointmentId: id },
        { headers: { Authorization: `Bearer ${atoken}` } }
      );
      if (res.data.success) {
        toast.success('Appointment cancelled');
        setAppointments((prev) =>
          prev.map((appt) => (appt._id === id ? { ...appt, cancelled: true } : appt))
        );
      } else toast.error(res.data.message);
    } catch {
      toast.error('Cancel failed');
    }
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-10 py-8 bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
        Appointments Dashboard
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl shadow-md bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-green-100 text-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Patient</th>
                  <th className="px-4 py-3 text-left font-semibold">Doctor</th>
                  <th className="px-4 py-3 text-left font-semibold">Fees</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Time</th>
                  <th className="px-4 py-3 text-left font-semibold">Cancelled</th>
                  <th className="px-4 py-3 text-left font-semibold">Completed</th>
                  <th className="px-4 py-3 text-left font-semibold">Payment</th>
                  <th className="px-4 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-green-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap flex items-center gap-3">
                      <img
                        src={appt.userData.profilePic}
                        alt="User"
                        className="w-8 h-8 rounded-full border"
                      />
                      <span className="text-gray-800 font-medium">
                        {appt.userData.fullname.firstname} {appt.userData.fullname.lastname}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap flex items-center gap-3">
                      <img
                        src={appt.docData.profilePic}
                        alt="Doctor"
                        className="w-8 h-8 rounded-full border border-green-300"
                      />
                      <span className="text-green-800 font-medium">
                        {appt.docData.fullname.firstname} {appt.docData.fullname.lastname}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">₹{appt.amount}</td>
                    <td className="px-4 py-3">{appt.slotDate.replace(/_/g, '/')}</td>
                    <td className="px-4 py-3">{appt.slotTime}</td>
                    <td className="px-4 py-3">
                      {appt.cancelled ? (
                        <span className="text-red-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-green-600 font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {appt.isCompleted ? (
                        <span className="text-green-700 font-semibold">Yes</span>
                      ) : (
                        <span className="text-yellow-700 font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {appt.payment ? (
                        <span className="text-green-700 font-semibold">Paid</span>
                      ) : (
                        <span className="text-gray-500">Not Paid</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {appt.cancelled ? (
                        <span className="text-red-400 font-medium">Cancelled</span>
                      ) : (
                        <button
                          onClick={() => handleCancel(appt._id)}
                          className="text-red-600 px-3 py-1 border-2 shadow-lg rounded-full hover:bg-red-500 hover:text-white font-bold transition"
                          title="Cancel Appointment"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col gap-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3 border-l-4 border-green-500"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={appt.userData.profilePic}
                    alt="User"
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="font-bold text-gray-800">
                      {appt.userData.fullname.firstname} {appt.userData.fullname.lastname}
                    </p>
                    <p className="text-xs text-gray-500">Patient</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={appt.docData.profilePic}
                    alt="Doctor"
                    className="w-10 h-10 rounded-full border border-green-300"
                  />
                  <div>
                    <p className="font-bold text-green-700">
                      {appt.docData.fullname.firstname} {appt.docData.fullname.lastname}
                    </p>
                    <p className="text-xs text-gray-500">Doctor</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-1 text-sm">
                  <p className="text-gray-500">Fees:</p>
                  <p className="font-medium">₹{appt.amount}</p>

                  <p className="text-gray-500">Date:</p>
                  <p>{appt.slotDate.replace(/_/g, '/')}</p>

                  <p className="text-gray-500">Time:</p>
                  <p>{appt.slotTime}</p>

                  <p className="text-gray-500">Cancelled:</p>
                  <p className={appt.cancelled ? 'text-red-600' : 'text-green-600'}>
                    {appt.cancelled ? 'Yes' : 'No'}
                  </p>

                  <p className="text-gray-500">Completed:</p>
                  <p className={appt.isCompleted ? 'text-green-700' : 'text-yellow-700'}>
                    {appt.isCompleted ? 'Yes' : 'No'}
                  </p>

                  <p className="text-gray-500">Payment:</p>
                  <p className={appt.payment ? 'text-green-700' : 'text-gray-500'}>
                    {appt.payment ? 'Paid' : 'Not Paid'}
                  </p>
                </div>

                {!appt.cancelled && (
                  <button
                    onClick={() => handleCancel(appt._id)}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded-full font-semibold hover:bg-red-600 transition"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllAppointments;

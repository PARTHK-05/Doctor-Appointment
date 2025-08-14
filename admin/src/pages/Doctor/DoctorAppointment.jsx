import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';

const DoctorAppointment = () => {
  const { dtoken, backendUrl } = useContext(DoctorContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/doctor/doctor-appointments`,
          { headers: { Authorization: `Bearer ${dtoken}` } }
        );

        if (data.success) {
          setAppointments(data.appointments);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (dtoken) fetchData();
  }, [dtoken, backendUrl]);

  const markAppointmentCompleted = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/doctor/appointment-completed`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === appointmentId ? { ...appt, isCompleted: true } : appt
          )
        );
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/doctor/appointment-cancelled`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === appointmentId ? { ...appt, cancelled: true } : appt
          )
        );
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        📅 My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500 bg-green-50 border border-green-200 rounded-xl p-4 text-center shadow-sm">
          No appointments found.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white rounded-xl shadow-md border border-green-200 p-5 hover:shadow-lg hover:border-green-300 transition"
            >
              {/* Patient Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={appt.userData.profilePic}
                  alt="user"
                  className="w-14 h-14 rounded-full object-cover border border-green-200"
                />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">
                    {appt.userData.fullname.firstname} {appt.userData.fullname.lastname}
                  </h3>
                  <p className="text-sm text-gray-500">{appt.userData.email}</p>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <p><span className="font-medium text-green-700">📞 Phone:</span> {appt.userData.phone}</p>
                <p><span className="font-medium text-green-700">⚧ Gender:</span> {appt.userData.gender}</p>
                <p><span className="font-medium text-green-700">🎂 DOB:</span> {appt.userData.dob}</p>
                <p><span className="font-medium text-green-700">📆 Date:</span> {appt.slotDate}</p>
                <p><span className="font-medium text-green-700">🕒 Time:</span> {appt.slotTime}</p>
                <p><span className="font-medium text-green-700">💰 Fees:</span> ₹{appt.amount}</p>
                <p>
                  <span className="font-medium text-green-700">📌 Status:</span>{' '}
                  {appt.cancelled ? (
                    <span className="text-red-500 font-medium">Cancelled</span>
                  ) : appt.isCompleted ? (
                    <span className="text-green-600 font-medium">Completed</span>
                  ) : (
                    <span className="text-yellow-500 font-medium">Upcoming</span>
                  )}
                </p>
                <p>
                  <span className="font-medium text-green-700">💳 Payment:</span>{' '}
                  {appt.payment ? (
                    <span className="text-green-600 font-medium">Paid</span>
                  ) : (
                    <span className="text-red-500 font-medium">Pending</span>
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              {!appt.cancelled && !appt.isCompleted && (
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => markAppointmentCompleted(appt._id)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium shadow hover:bg-green-700 transition"
                  >
                    ✅ Mark Completed
                  </button>
                  <button
                    onClick={() => cancelAppointment(appt._id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium shadow hover:bg-red-600 transition"
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;

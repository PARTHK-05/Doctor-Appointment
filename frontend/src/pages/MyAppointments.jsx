import React, { useState, useEffect, useContext } from 'react';
import Nav from '../components/Nav';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

const MyAppointments = () => {
  const [Appointments, setAppointments] = useState([]);
  const { token, backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(backendUrl + `/users/list-appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;

        if (data.success) {
          setAppointments(data.appointments.reverse());
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);


  const cancelAppointment = async(appointmentId)=>{
    try {
      const {data} = await axios.post(backendUrl+`/users/cancelled-appointment`,{appointmentId},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      if(data.success){
        console.log(data.message)
        toast.success("Appointment has been Cancelled")
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      <div className="w-full h-10">
        <Nav />
      </div>
      <div className="px-4 sm:px-8 md:px-16 py-10 w-full min-h-screen bg-gray-50">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-8 text-center sm:text-left">Appointments</h1>

        <div className="flex flex-col gap-8">
          {Appointments.filter(appointment => appointment.cancelled === false).length === 0 ? (
            <p className="text-lg text-gray-600 text-center">No appointments found.</p>
          ) : (
            Appointments.filter(appointment => appointment.cancelled === false).map((appointment) => (
              <div
                key={appointment._id}
                className="flex flex-col sm:flex-row justify-between items-center bg-white px-6 py-6 rounded-2xl shadow-lg gap-6"
              >
                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center">
                  <div className="w-40 h-40 rounded-2xl overflow-hidden bg-green-300 shadow-md border-2 border-white shadow-green-200">
                    <img
                      src={appointment.docData.profilePic}
                      alt="Doctor"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {appointment.docData.fullname.firstname} {appointment.docData.fullname.lastname}
                    </h2>
                    <p className="text-sm text-gray-600 mb-1">
                      Speciality: <span className="font-medium text-black">{appointment.docData.speciality}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Degree: <span className="font-medium text-black">{appointment.docData.degree}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Address: <span className="font-medium text-black">{appointment.docData.address}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Date: <span className="font-medium text-black">{appointment.slotDate}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Time: <span className="font-medium text-black">{appointment.slotTime}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end items-center gap-4 w-full sm:w-auto">
                  {/* <button className="w-full sm:w-auto px-7 py-2 text-base rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Pay Online
                  </button> */}
                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="w-full sm:w-auto px-5 py-2 text-base rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-red-200 hover:from-red-600 hover:to-red-600 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        </div>

      <Footer />
    </>
  );
};

export default MyAppointments;

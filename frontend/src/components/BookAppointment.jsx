import React, { useEffect, useState, useContext } from "react";
import { Calendar, Clock, FileText, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format, addDays } from "date-fns";
import { AppContext } from "../context/AppContext";
import Nav from '../components/Nav';

const BookAppointment = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { backendUrl, token , user } = useContext(AppContext);
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/users/doctor/${id}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }});
        const data = response.data;
        if (data.success) {
          setDoctor(data.doctor);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (token) fetchData();
  }, [id, token]);

  const times = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleBook = () => {
    if (!user) {
        toast.error("User not logged in.");
        return;
    }
    if (selectedDay !== null && selectedTime && reason) {
      setShowModal(true);
    } else {
      toast.error("Please fill all fields.");
    }
  };

  const handleConfirm = () => {
    bookAppointment();
  };

  const bookAppointment = async () => {
    try {
        const selectedDate = next7Days[selectedDay];
        const slotDate = `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
        const response = await axios.post(backendUrl+`/users/book-appointment`, {
        docId: id,
        slotDate,
        slotTime: selectedTime,
        userId:user,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      if (data.success) {
        toast.success("Appointment booked successfully!");
        setShowModal(false);
        setSelectedDay(0);
        setSelectedTime("");
        setReason("");
        navigate("/my-appointments")
      } else {
        toast.error(data.message || "Failed to book appointment.");
      }
    } catch (error) {
      toast.error("An error occurred while booking the appointment.");
    }
  };

  return (
    <>
      <div className="w-full">
        <Nav />
      </div>
      <div className="min-h-screen pt-20">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Book Your Appointment</h1>
            <p className="text-gray-600 text-center mt-2">Schedule your visit with our healthcare professionals</p>
          </div>
        </div>

        <div className="w-full px-4 py-8">
          <div className="w-full flex justify-start items-start gap-5">
            <div className="relative w-[40%]">
              <div className="w-full rounded-2xl shadow-xl overflow-hidden bg-green-200">
                <img
                  src={doctor?.profilePic}
                  alt="Doctor"
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
            </div>

            <div className="bg-white w-full rounded-2xl shadow-xl px-10 py-28 space-y-6">
              <div className="text-black">
                <h1 className="text-2xl font-bold">
                  {doctor?.fullname?.firstname} {doctor?.fullname?.lastname}
                </h1>
                <p className="text-lg opacity-90">
                  {doctor?.degree} - {doctor?.speciality}
                </p>
                <p className="text-sm opacity-80">{doctor?.experience}</p>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <h2 className="font-semibold">About</h2>
                <p>{doctor?.about}</p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col justify-evenly items-start p-4 gap-5 mt-6">
            <div className="w-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Booking slots</h2>
              <div className="flex gap-3 overflow-x-auto">
                {next7Days.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`flex flex-col items-center px-4 py-7 rounded-full border text-sm min-w-[64px]
                      ${selectedDay === index
                        ? "bg-green-400 text-white"
                        : "bg-white text-gray-800 border-gray-300"
                      }`}
                  >
                    <span className="font-medium">{format(date, "EEE").toUpperCase()}</span>
                    <span className="text-base">{format(date, "d")}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 w-full">
              <label className="text-base font-medium text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Choose Time
              </label>
              <div className="flex flex-wrap gap-3">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-full border transition text-sm font-medium
                      ${selectedTime === time
                        ? "bg-green-400 text-white shadow-md"
                        : "bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-blue-100"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-green-600" />
                <label className="text-lg font-semibold text-gray-800">Reason for Visit</label>
              </div>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-green-500 focus:outline-none transition-colors resize-none"
                placeholder="Please describe your symptoms or reason for visit..."
                rows="4"
              />
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-gradient-to-r bg-green-400 text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-in">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                  Confirm Your Appointment
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Date</p>
                      <p className="text-gray-600">{next7Days[selectedDay]?.toDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Time</p>
                      <p className="text-gray-600">{selectedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800">Reason</p>
                      <p className="text-gray-600">{reason}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookAppointment;

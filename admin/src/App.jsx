import { useContext } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminCotext';
import { DoctorContext } from './context/DoctorContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import BookAppointment from './components/BookAppointment';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

function App() {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  if (atoken) {
    return (
      <div className="bg-[#F8F9FD]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/book-appointment/:id" element={<BookAppointment />} />
          </Routes>
        </div>
      </div>
    );
  }

  if (dtoken) {
    return (
      <div className="bg-[#F8F9FD]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
            <Route path="/doctor-appointments" element={<DoctorAppointment />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;

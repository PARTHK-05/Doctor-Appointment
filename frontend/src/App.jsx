import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import { ToastContainer, toast } from 'react-toastify';
import BookAppointment from './components/BookAppointment'
import MyProfile from './pages/MyProfile'
import FindDoctor from './components/FindDoctor'
import MyAppointments from './pages/MyAppointments'



function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/book-appointment/:id' element={<BookAppointment/>}/>
        <Route path='/find-doctors' element={<FindDoctor/>}/> 
        <Route path='/profile' element={<MyProfile/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>

      </Routes>
    </>
  )
}

export default App

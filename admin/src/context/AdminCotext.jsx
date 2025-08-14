import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext =  createContext()

const AdminContextProvider = (props)=>{
    
    const [atoken, setAToken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken') : '')

    const backendUrl = import.meta.env.VITE_BACKEND_URL
        const [doctors, setDoctors] = useState([]) 


    const getAllDoctors = async () => {
        try {
            const response = await axios.get(`${backendUrl}/admin/all_doctor`, {
            headers: {
                Authorization: `Bearer ${atoken}`
            }
            });
            const data = response.data;
        

            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl+`/admin/change_availability`,{docId},{
                headers:{
                    Authorization:`Bearer ${atoken}`
                }
            })

            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const value={
        atoken,
        setAToken,
        backendUrl,
        getAllDoctors,
        doctors,
        changeAvailability
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
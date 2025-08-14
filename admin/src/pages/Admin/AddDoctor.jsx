import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminCotext';
import { toast } from 'react-toastify';
import axios from 'axios'

const AddDoctor = () => {

    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(assets.upload_area);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [degree, setDegree] = useState('');
  const [address, setAddress] = useState('');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');

  const {backendUrl , atoken} = useContext(AdminContext)

const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (!profilePic) {
    toast.error("Profile Picture is missing");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("speciality", speciality);
    formData.append("degree", degree);
    formData.append("address", address);
    formData.append("fees", fees);
    formData.append("about", about);

    const response = await axios.post(`${backendUrl}/admin/add_doctor`, formData, {
      headers: {
        "Authorization":`Bearer ${atoken}`,
        "Content-Type": "multipart/form-data", 
      },
    });

    if (response.data.success) {
      toast.success("Doctor added successfully");
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setExperience('');
      setSpeciality('');
      setDegree('');
      setAddress('');
      setFees('');
      setAbout('');
      setProfilePic(null);
      setProfilePicPreview(assets.upload_area);
    } else {
      toast.error(response.data.message || "Failed to add doctor");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Server error");
  }
};

  
  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center items-center px-4">
      <form onSubmit={onSubmitHandler} className="w-full  bg-white px-8 rounded-2xl  space-y-6" encType="multipart/form-data">
      
    <div className="flex justify-start border-b-2 py-2">
        <label htmlFor="profilePic" className="cursor-pointer">
            <img
            src={profilePicPreview}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
        </label>
        <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
                setProfilePic(file);
                setProfilePicPreview(URL.createObjectURL(file));
            }
            }}
        />
    </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input 
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
                </label>
                <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <select 
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl">
                <option value="">Select</option>
                <option value="more">More than 2 years</option>
                <option className='rounded-b-full' value="less">Less than 2 years</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
              <input 
                type="text"
                name="speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <input 
                type="text"
                name="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input    
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}            
                className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
              <input    
                type="number"
                name="fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
              <textarea 
                name="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none"></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center  py-2">
          <button
            type="submit"
            className="px-6 py-2 flex justify-center items-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;

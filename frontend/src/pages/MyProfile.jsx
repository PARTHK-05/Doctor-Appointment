import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Nav from '../components/Nav';

const MyProfile = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState(null); // File or URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/users/user_profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        if (data.success) {
          const user = data.user;
          setUserData(user);
          setFirstName(user.fullname?.firstname || '');
          setLastName(user.fullname?.lastname || '');
          setEmail(user.email || '');
          setPhone(user.phone || '');
          setAddress(user.address || '');
          setDob(user.dob || '');
          setGender(user.gender || '');
          setProfilePic(user.profilePic || null);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Failed to fetch profile: ' + error.message);
      }
    };
    if (token) fetchData();
  }, [token]);


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("profilePic", profilePic);
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("email", email);

      console.log(profilePic)

      const response = await axios.put(`${backendUrl}/users/update_profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });

      if (response.data.success) {
        toast.success('Profile updated successfully');
        setEditMode(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Update failed: ' + error.message);
    }
  };

  if (!userData) {
    return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;
  }

  return (
    <>
    <div className='w-full h-10'>
        <Nav/>
    </div>
    <div className='p-2 '>
    <div className="w-full mx-auto px-10 py-6 bg-white shadow-md rounded-xl pt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {editMode ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Edit
          </button>
        )}
      </div>

      <form className="space-y-6">
        {/* Profile Picture */}
        <div className="flex  items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-green-200 shadow-lg mb-2">
            {profilePic ? (
              <img
                src={typeof profilePic === 'string' ? profilePic : URL.createObjectURL(profilePic)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                No Image
              </div>
            )}
          </div>
          <div className='flex flex-col gap-10 mx-5'>
            {editMode && (
                <input
                type="file"
                placeholder='upload Image'
                className="text-sm border-2 px-3 py-2 rounded-2xl text-center"
                onChange={(e) => setProfilePic(e.target.files[0])}
                />
            )}
            <label className="text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
          </div>

        </div>

        {/* Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              readOnly={!editMode}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              readOnly={!editMode}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!editMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            readOnly={!editMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            readOnly={!editMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* DOB & Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              readOnly={!editMode}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={!editMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </form>
    </div>
    </div>

    </>
  );
};

export default MyProfile;

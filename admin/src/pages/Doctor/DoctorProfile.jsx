import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { dtoken, backendUrl } = useContext(DoctorContext);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    profilePic: null,
    firstname: "",
    lastname: "",
    email: "",
    degree: "",
    speciality: "",
    experience: "",
    fees: "",
    address: "",
    about: "",
    available: false,
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/doctor/particular-doctor`, {
          headers: { Authorization: `Bearer ${dtoken}` },
        });

        if (res.data.success) {
          const d = res.data.doctor;
          setFormData({
            profilePic: d.profilePic || null,
            firstname: d.fullname?.firstname || "",
            lastname: d.fullname?.lastname || "",
            email: d.email || "",
            degree: d.degree || "",
            speciality: d.speciality || "",
            experience: d.experience || "",
            fees: d.fees || "",
            address: d.address || "",
            about: d.about || "",
            available: d.available || false,
          });
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Error fetching profile: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (dtoken) fetchDoctor();
  }, [dtoken, backendUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === "available") {
          fd.append(key, val ? "true" : "false");
        } else {
          fd.append(key, val);
        }
      });

      const { data } = await axios.put(
        `${backendUrl}/doctor/update-profile`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        setEditMode(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="p-4 w-full">
      <div className="shadow-lg rounded-xl p-8 bg-white">
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-400">
            {formData.profilePic ? (
              <img
                src={
                  typeof formData.profilePic === "string"
                    ? formData.profilePic
                    : URL.createObjectURL(formData.profilePic)
                }
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {formData.firstname} {formData.lastname}
            </h2>
            <p className="text-gray-500">{formData.email}</p>
            <p className="text-sm text-green-600">
              {formData.available
                ? "Available for Appointments"
                : "Not Available"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mb-4">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="text-lg font-semibold text-gray-700">Personal Info</div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              readOnly={!editMode}
            />
            <InputField
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!editMode}
          />

          <div className="text-lg font-semibold text-gray-700">Professional Info</div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              readOnly={!editMode}
            />
            <InputField
              label="Speciality"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              readOnly={!editMode}
            />
            <InputField
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              readOnly={!editMode}
            />
            <InputField
              label="Fees"
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              readOnly={!editMode}
            />
          </div>

          <div className="text-lg font-semibold text-gray-700">Clinic Info</div>
          <InputField
            label="Clinic Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            readOnly={!editMode}
          />
          <TextAreaField
            label="About"
            name="about"
            value={formData.about}
            onChange={handleChange}
            readOnly={!editMode}
          />

          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              disabled={!editMode}
              className="w-5 h-5 accent-green-500"
            />
          </div>

          {editMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePic"
                onChange={handleChange}
                className="border px-3 py-2 rounded-xl w-full"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Small reusable input components
const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  </div>
);

const TextAreaField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      {...props}
      rows={4}
      className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  </div>
);

export default DoctorProfile;

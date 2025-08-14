const { validationResult } = require("express-validator");
const UserModel = require("../models/user-model"); 
const DoctorModel = require("../models/doctor-model");
const BlacklistedTokenModel = require("../models/blacklistToken-model");
const validator = require("validator");
const AppointmentModel = require("../models/Appointment-model");


// Register
module.exports.registerUser = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    let { firstname, lastname, email, password } = req.body;

    const hashPassword = await UserModel.hashPassword(password); // 👈 updated

    const isUserAlreadyExists = await UserModel.findOne({ email }); // 👈 updated

    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "This email is already registered" });
    }

    const profilePic = req.file ? req.file.path : null;

    let user = await UserModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashPassword,
      profilePic,
    });

    const token = user.generateAuthToken(); // 👈 updated
    res.status(201).json({ token, user }); // 👈 updated
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

// Login
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password"); // 👈 updated
  if (!user) {
    return res.status(401).json({ message: "User with this email not found" });
  }

  const isMatch = await user.ComparePassword(password); // 👈 updated

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken(); // 👈 updated
  res.cookie("token", token);
  res.status(200).json({ token, user }); // 👈 updated
};

// Logout
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (token) {
    await BlacklistedTokenModel.create({ token });
  }

  res.status(200).json({ message: "Logged out" });
};


module.exports.getUser = async (req,res,next) => {
  try {
   const userId = req.user._id; 
    const user = await UserModel.findById(userId).select('-password')
    if(!user){
          return res.status(404).json({ success: false, message: 'user not found' });
    }

     res.json({ success: true, user });

  } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
}


module.exports.updateProfile = async (req, res, next) => {
  try {
    const { firstname,lastname , email, phone, address, dob, gender  } = req.body;

    const profilePic = req.file ? req.file.path : null;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      { fullname: {
                firstname,
                lastname
            },email, phone, address, dob, gender , profilePic },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Profile updated successfully', user: updatedUser });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Server error while updating profile' });
  }
};

// Api to book appointment
module.exports.bookAppointment = async(req,res)=>{
    try {
        const {userId , docId , slotDate , slotTime} = req.body

        // console.log(userId)


        const docData = await DoctorModel.findById(docId).select('-password')

        // console.log(docData)

        if(!docData.available){
          return res.json({success:false , message:"doctor is not available to take the appointment"})
        }

        const slots_booked = docData.slots_booked


        // checking for slots availabiltiy
        if(slots_booked[slotDate]){
          if(slots_booked[slotDate].includes(slotTime)){
            return res.json({success:false , message:"doctor is not available to take the appointment"})
          }else{
            slots_booked[slotDate].push(slotTime)
          }
        }else{
          slots_booked[slotDate]=[]
          slots_booked[slotDate].push(slotTime)
        }
    const userData = await UserModel.findById(userId).select('-password')

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // console.log(userData)


        delete docData.slots_booked
        
        const appointmentData = {
          userId,
          docId,
          userData,
          docData,
          amount:docData.fees,
          slotTime,
          slotDate,
          date:Date.now(),
          cancelled:false,
        }

        const newAppointment = new AppointmentModel(appointmentData)

        await newAppointment.save()

        await DoctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true , message:"Appointment booked"})

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
}


module.exports.listAppointments = async (req, res) => {
  try {
    const userId =  req.user?._id;


    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }


    const appointments = await AppointmentModel.find({ userId });
    res.json({ success: true, appointments });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to cancel appointment
module.exports.Cancel_appointment = async (req, res) => {
  try {
    const {  appointmentId } = req.body;

    const userId =  req.user?._id;
    

    const appointment_data = await AppointmentModel.findById(appointmentId);

    if (!appointment_data) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // verify appointment user
    if (appointment_data.userId != userId) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    // mark appointment as cancelled
    await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointment_data;

    const doctor = await DoctorModel.findById(docId);

    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const slots_booked = doctor.slots_booked || {};

    if (Array.isArray(slots_booked[slotDate])) {
      slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);

      // Clean up empty slot arrays
      if (slots_booked[slotDate].length === 0) {
        delete slots_booked[slotDate];
      }
    }

    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: 'Appointment Cancelled' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};





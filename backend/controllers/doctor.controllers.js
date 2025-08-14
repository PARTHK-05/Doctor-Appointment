const { validationResult } = require("express-validator");
const Doctormodel = require("../models/doctor-model")
const BlacklistedTokenModel = require("../models/blacklistToken-model");

const AppointmentsModel = require('../models/Appointment-model');


module.exports.registerDoctor = async(req,res,next)=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error :error.array()})
        }

        let{firstname, lastname, email , password , speciality , degree , experience , about , available , fees , address , date , slots_booked} = req.body;

        const hashPassword = await Doctormodel.hashPassword(password)

        const isUserAlreadyExists = await Doctormodel.findOne({email})

        if(isUserAlreadyExists){
            return res.status(400).json({message:"Already this email is exists"})
        }
       const profilePic = req.file ? req.file.path : null;

        let doctor = await Doctormodel.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password:hashPassword,
            profilePic, speciality , degree , experience , about , available , fees , address , date , slots_booked
        })
        const token = doctor.generateAuthToken();
        res.status(201).json({token , doctor})

    } catch (error) {
        console.log(error.message);
    }
}


module.exports.loginDoctor = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    let{email , password} = req.body;

    const doctor = await Doctormodel.findOne({email}).select("+password");
    if(!doctor){
        return res.status(401).json({message : "doctor is not present with is email id"})
    }

    const isMatch = await doctor.ComparePassword(password);

   if(!isMatch){
      return res.status(401).json({message : "invalid email and password"})
   }

    const token = doctor.generateAuthToken();
   res.cookie("token",token);
   res.status(200).json({token , doctor})
}

module.exports.logoutDoctor = async(req,res,next)=>{
   
   res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];


   await BlacklistedTokenModel.create({token});

   res.status(200).json({message : 'Looged out'})
}

module.exports.changeAvailability = async (req, res, next) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    const docData = await Doctormodel.findById(docId);
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const updatedDoctor = await Doctormodel.findByIdAndUpdate(
      docId,
      { available: !docData.available },
      { new: true }
    );

    res.json({ success: true, message: "Availability changed", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error changing availability:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// api to get doctor by id

module.exports.getDoctor = async(req,res,next)=>{
    try {
        const doctorId = req.params.id;
        const doctor = await Doctormodel.findById(doctorId).select('-password');
        if (!doctor) {
             return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.json({ success: true, doctor });
    } catch (error) {
        console.error("Error fetching doctor by ID:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


module.exports.DoctorList = async (req,res,next) => {
    try {
        const doctors = await Doctormodel.find({}).select(['-password' , '-email'])

        res.json({success:true,doctors})
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}


module.exports.getAppointments = async(req,res)=>{
    try {
        const docId = req.doctor?._id;

        const appointments = await AppointmentsModel.find({docId}).select('');

       res.json({success:true,appointments})
    } catch (error) {
        console.error("Error :", error.message);
        res.status(500).json({ success: false, message: "Server error" }); 
    }
}

module.exports.ParticularDoctor = async(req,res)=>{
  try {
    const docId = req.doctor?._id;

    if(!docId){
      res.json({status:false , message:"Doctor is not present"})
    }
    const doctor = await Doctormodel.findById(docId)

    res.json({success:true , doctor})
  } catch (error) {
    console.log(error)
  }
}

module.exports.UpdateProfile = async (req, res) => {
  try {

    const {
      firstname,lastname ,
      email,
      address,
      degree,
      experience,
      about,
      fees,
      available,
      speciality
    } = req.body;

    const profilePic = req.file ? req.file.path : null;

    const updatedFields = {
      fullname: {
        firstname,
        lastname
      },
      email,
      address,
      degree,
      experience,
      about,
      fees,
      available,
      speciality,
      profilePic
    };


    const updatedDoctor = await Doctormodel.findByIdAndUpdate(
      req.doctor._id,
      updatedFields,
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      doctor: updatedDoctor
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Server error while updating profile' });
  }
};

module.exports.CompletedAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.doctor?._id;

    const appointmentData = await AppointmentsModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId?.toString() === docId?.toString()) {
      await AppointmentsModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.status(200).json({ success: true, message: "Appointment marked as completed" });
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized or invalid appointment" });
    }
  } catch (error) {
    console.error('Error marking appointment as completed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.CancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.doctor?._id;

    const appointmentData = await AppointmentsModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId?.toString() === docId?.toString()) {
      await AppointmentsModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized or invalid appointment" });
    }
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports.doctorDashboard = async(req,res)=>{
  try {
    const docId = req.doctor?._id

    const appointment = await AppointmentsModel.find({docId})

    let earnings = 0

    appointment.map((item)=>{
      if(item.isCompleted || item.payment){
        earnings+=item.amount
      }
    })

    let patients = []

    appointment.map((item)=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId)
      }
    })

    const DashData ={
      earnings,
      appointments:appointment.length,
      patients:patients.length,
      latestAppointments:appointment.reverse().slice(0,5)
    }

    res.json({success:true , DashData})

  } catch (error) {
    console.log(error)
    res.json({success:false , message:error.message})
  }
}





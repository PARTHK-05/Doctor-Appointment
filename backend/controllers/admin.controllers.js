const { validationResult } = require("express-validator");
const Adminmodel = require("../models/admin-model")
const DoctorModel = require("../models/doctor-model");
const BlacklistedTokenModel = require("../models/blacklistToken-model");
const validator = require("validator");
const AppointmentsModel = require('../models/Appointment-model')
const UserModel = require('../models/user-model')


// Register
module.exports.registerAdmin = async(req,res,next)=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error :error.array()})
        }

        let{firstname, lastname, email , password } = req.body;

        const hashPassword = await Adminmodel.hashPassword(password)

        const isUserAlreadyExists = await Adminmodel.findOne({email})

        if(isUserAlreadyExists){
            return res.status(400).json({message:"Already this email is exists"})
        }
       const profilePic = req.file ? req.file.path : null;

        let admin = await Adminmodel.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password:hashPassword,
            profilePic,
        })
        const token = admin.generateAuthToken();
        res.status(201).json({token , admin})

    } catch (error) {
        console.log(error.message);
    }
}

// Login
module.exports.loginAdmin = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    let{email , password} = req.body;

    const admin = await Adminmodel.findOne({email}).select("+password");
    if(!admin){
        return res.status(401).json({message : "admin is not present with is mail id"})
    }

    const isMatch = await admin.ComparePassword(password);

   if(!isMatch){
      return res.status(401).json({message : "invalid email and password"})
   }

    const token = admin.generateAuthToken();
   res.cookie("token",token);
   res.status(200).json({token , admin})
}

// Logout
module.exports.logoutAdmin = async(req,res,next)=>{
   
   res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];


   await BlacklistedTokenModel.create({token});

   res.status(200).json({message : 'Looged out'})
}

//  API for adding Doctor
module.exports.addDoctor = async (req, res , next) => {
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error :error.array()})
        }
        let {
            firstname, lastname,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            slots_booked
        } = req.body;

        const available = true;
        const date = new Date();

        const profilePic = req.file ? req.file.path : null;

        if (!validator.isEmail(email)) {
           return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password should be at least 6 characters" });
        }

        const existingDoctor = await DoctorModel.findOne({ email });
        if (existingDoctor) {
            return res.json({ success: false, message: "Doctor with this email already exists" });
        }

        const hashPassword = await Adminmodel.hashPassword(password);

        const newDoctor = new DoctorModel({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: hashPassword,
            speciality,
            degree,
            experience,
            about,
            available,
            fees,
            address,
            date,
            slots_booked,
            profilePic
        });


        await newDoctor.save();

        res.json({ success: true, message: "Doctor added successfully", doctor: newDoctor });

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Api for all doctors
module.exports.allDoctors = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const doctors = await DoctorModel.find({}).select('-password');
        res.json({ success: true, doctors });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


//Api for all Appointments
module.exports.allappointments = async (req,res,next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const appointments = await AppointmentsModel.find({}).select('-password');
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// module.exports.cancelAppointment = async(req,res)=>{
//     try{
//         const {userId , appointmentId} = req.body;

//         console.log(userId)
//         console.log(appointmentId)

//         const appointmentData = await  AppointmentsModel.findById(appointmentId)

//         // verify appointment usser

//         if(appointmentData.userId !== userId){
//             return res.json({success:false , message:'Unauthorized action'})
//         }

//         await AppointmentsModel.findByIdAndUpdate(appointmentId , {cancelled : true})

//         // releasing doctor slot 

//         const {docId , slotDate , slotTime} = appointmentData

//         const docData = await DoctorModel.findById(docId)

//         let slots_booked = docData.slots_booked

//         slots_booked[slotDate] = slots_booked[slotDate].filter(e => e != slotTime)

//         await DoctorModel.findByIdAndUpdate(docId , {slots_booked})

//         res.json({success:true , message:'Appointment cancelled'})


//     }catch(error){
//         console.log(error.message);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// }


module.exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await AppointmentsModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    await AppointmentsModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointment;
    const doctor = await DoctorModel.findById(docId);

    if (doctor?.slots_booked?.[slotDate]) {
      doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate].filter(
        (slot) => slot !== slotTime
      );
      await DoctorModel.findByIdAndUpdate(docId, {
        slots_booked: doctor.slots_booked,
      });
    }

    res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports.dashboardData = async(req,res)=>{
    try {
        
        const doctors = await DoctorModel.find({})

        const users = await UserModel.find({})

        const appointments = await AppointmentsModel.find({})

        const dashdata = {
            doctors:doctors.length,
            users:users.length,
            appointments:appointments.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        res.json({success:true , dashdata})


    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });  
    }
}




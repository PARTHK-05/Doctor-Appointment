const express = require('express')
const router = express.Router();
const {body}  = require("express-validator")
const DoctorController = require('../controllers/doctor.controllers')
const{ upload }= require('../middlewares/cloudinary')
const Authmiddlewear = require("../middlewares/Auth.middleware")

router.post('/register',
  upload.single('profilePic'), 
  [
    body("firstname").isLength({ min: 3 }).withMessage("First name must contain at least 3 characters"),
    body("lastname").isLength({ min: 3 }).withMessage("Last name must contain at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must contain at least 6 characters"),
  ],
  DoctorController.registerDoctor
);

router.post('/login',[
    body("email").isEmail().withMessage('invalid message'),
    body("password").isLength({min:6}).withMessage("password must contain atleast 6 charaters long")
],
    DoctorController.loginDoctor
)

router.get('/logout',Authmiddlewear.authDoctor ,  DoctorController.logoutDoctor)

router.get('/all_doctors',DoctorController.DoctorList);

router.get('/doctor-appointments',Authmiddlewear.authDoctor,DoctorController.getAppointments);

router.get('/particular-doctor',Authmiddlewear.authDoctor , DoctorController.ParticularDoctor)

router.put('/update-profile',  upload.single('profilePic'), Authmiddlewear.authDoctor, DoctorController.UpdateProfile);

router.post('/appointment-completed', Authmiddlewear.authDoctor , DoctorController.CompletedAppointment)

router.post('/appointment-cancelled', Authmiddlewear.authDoctor , DoctorController.CancelAppointment)


router.get('/dashboard',Authmiddlewear.authDoctor , DoctorController.doctorDashboard)

module.exports = router;
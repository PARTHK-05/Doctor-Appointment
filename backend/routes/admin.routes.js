const express = require('express')
const router = express.Router();
const {body}  = require("express-validator")
const AdminController = require('../controllers/admin.controllers')
const DoctorController = require('../controllers/doctor.controllers')
const{ upload }= require('../middlewares/cloudinary')
const Authmiddlewear = require("../middlewares/Auth.middleware")

router.post(
  '/register',
  upload.single('profilePic'),
  [
    body("firstname").isLength({ min: 3 }).withMessage("First name must contain at least 3 characters"),
    body("lastname").isLength({ min: 3 }).withMessage("Last name must contain at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must contain at least 6 characters"),
  ],
  AdminController.registerAdmin
);



router.post('/login',[
    body("email").isEmail().withMessage('invalid message'),
    body("password").isLength({min:6}).withMessage("password must contain atleast 6 charaters long")
],
    AdminController.loginAdmin
)

router.get('/logout',Authmiddlewear.authAdmin , AdminController.logoutAdmin)

router.post('/add_doctor',Authmiddlewear.authAdmin,
  upload.single('profilePic'), 
  [
    body("firstname").isLength({ min: 3 }).withMessage("First name must contain at least 3 characters"),
    body("lastname").isLength({ min: 3 }).withMessage("Last name must contain at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must contain at least 6 characters"),
  ],
  AdminController.addDoctor
);


router.get('/all_doctor', Authmiddlewear.authAdmin, AdminController.allDoctors);

router.post('/change_availability', Authmiddlewear.authAdmin,DoctorController.changeAvailability);

router.get('/doctor/:id', Authmiddlewear.authAdmin, DoctorController.getDoctor);

router.get("/all-appointments",Authmiddlewear.authAdmin , AdminController.allappointments);

router.put("/cancelled-appointmet",Authmiddlewear.authAdmin , AdminController.cancelAppointment)


router.get('/dashboard' , Authmiddlewear.authAdmin  , AdminController.dashboardData)

module.exports = router;
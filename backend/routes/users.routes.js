const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const UsersController = require('../controllers/users.controllers');
const DoctorController = require('../controllers/doctor.controllers');
const { upload } = require('../middlewares/cloudinary');
const Authmiddlewear = require("../middlewares/Auth.middleware");

router.post(
  '/register',
  upload.single('profilePic'),
  [
    body("firstname").isLength({ min: 3 }).withMessage("First name must contain at least 3 characters"),
    body("lastname").isLength({ min: 3 }).withMessage("Last name must contain at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must contain at least 6 characters"),
  ],
  UsersController.registerUser
);

router.post(
  '/login',
  [
    body("email").isEmail().withMessage('Invalid email'),
    body("password").isLength({ min: 6 }).withMessage("Password must contain at least 6 characters")
  ],
  UsersController.loginUser
);

router.get('/logout',Authmiddlewear.authUser,UsersController.logoutUser);

router.get('/user_profile', Authmiddlewear.authUser, UsersController.getUser);

router.put('/update_profile',upload.single('profilePic'), Authmiddlewear.authUser, UsersController.updateProfile);

router.get('/doctor/:id', Authmiddlewear.authUser, DoctorController.getDoctor);


router.post('/book-appointment',Authmiddlewear.authUser,UsersController.bookAppointment)

router.get('/list-appointments', Authmiddlewear.authUser, UsersController.listAppointments);

router.post('/cancelled-appointment', Authmiddlewear.authUser , UsersController.Cancel_appointment)




module.exports = router;

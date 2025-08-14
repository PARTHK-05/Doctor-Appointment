const DoctorModel = require("../models/doctor-model")
const AdminModel = require("../models/admin-model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const BlacklistedTokenModel = require("../models/blacklistToken-model");
const userModel = require("../models/user-model");

module.exports.authAdmin = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);
    if(!token){
        return res.status(401).json({message : 'unauthorized'})
    }


    const isBlacklisted = await BlacklistedTokenModel.findOne({token:token});

    if(isBlacklisted)  return  res.status(401).json({message : 'unauthorized'}) 

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const admin = await AdminModel.findById(decoded._id)

        if (!admin) {
            return res.status(401).json({ message: "unauthorized" });
        }

        req.admin = admin;
        next();
    }
    catch(err){
        console.error("AuthAdmin error:", err);
        return res.status(401).json({ message: "unauthorized" });
    }
}

module.exports.authDoctor = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message : 'unauthorized'})
    }

    const isBlacklisted = await BlacklistedTokenModel.findOne({token:token});

    if(isBlacklisted)  return  res.status(401).json({message : 'unauthorized'}) 

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const doctor = await DoctorModel.findById(decoded._id)

        req.doctor = doctor;

        return next();
    }
    catch(err){
        return res.status(401).json({message : 'unauthorized'}) 
    }
}

module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message : 'unauthorized'})
    }

    const isBlacklisted = await BlacklistedTokenModel.findOne({token:token});

    if(isBlacklisted)  return  res.status(401).json({message : 'unauthorized'}) 

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        // console.log("Decoded token:", decoded);

        const user = await userModel.findById(decoded._id)

        // console.log("User fetched from DB:", user);

        req.user = user;

        return next();
    }
    catch(err){
        return res.status(401).json({message : 'unauthorized'}) 
    }
}



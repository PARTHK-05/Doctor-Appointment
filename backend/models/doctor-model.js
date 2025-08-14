const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const doctorSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            minlength:[3,"first name must be at least 3 characters long"],
            required:true,
        },
        lastname:{
            type:String,
            minlength:[3,"last name must be at least 3 characters long"],
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"email must be at least 3 characters long"], 
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    profilePic:{
        type:String,
    },
    speciality:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    available:{
        type:Boolean,
        required:true,
    },
    fees:{
        type:Number,
        required:true,
    },
    address:{
        type:Object,
        required:true,
    },
    date:{
        type:Number,
        required:true
    },
    slots_booked:{
        type:Object,
        default:{}
    }
},{minimize:false})

doctorSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}

doctorSchema.methods.ComparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

doctorSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const doctorModel = mongoose.model("doctor",doctorSchema);

module.exports = doctorModel
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            minlength: [3, "First name must be at least 3 characters long"],
            required: true,
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    profilePic: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA..." // shortened for brevity
    },
    address: {
        type: Object,
        default: '',
    },
    gender: {
        type: String,
        default: "Not Selected"
    },
    dob: {
        type: String,
        default: "Not Selected"
    },
    phone: {
        type: String,
        default: "0000000000"
    }
});

// Generate JWT
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};

// Compare password
userSchema.methods.ComparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Hash password (before saving)
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

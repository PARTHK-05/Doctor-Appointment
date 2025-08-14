const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require("cors")
const app = express();
const connectTodb = require("./db/db");
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/admin.routes')
const doctorRoutes = require('./routes/doctor.routes')
const userRoutes = require('./routes/users.routes')

connectTodb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("hello wrold");
})

app.use("/admin",adminRoutes)
app.use("/doctor",doctorRoutes)
app.use("/users",userRoutes)

module.exports = app;
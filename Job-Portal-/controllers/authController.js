const User = require('../models/User.js');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Job = require('../models/Job.js');


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const register = async(req,res) => {
    try{
        const {name,email,password,role} = req.body;

        if (!name || !email || !password || !role){
            return res.status(400).json({success: false, message : "All field required"});
        }

        //see if the user already exists 
        const existing = await User.findOne({email});
        if (existing) return res.status(401).json({success: false, message : "User already exist"});

        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            name : name,
            email : email,
            password : hashPassword,
            role : role
        });

        return res.status(201).json({success : true ,message : "Registration done successfully"});

    } catch(error){
     console.error("Server Error:",error);
     return res.status(500).json({success: false, message : "Server Issue"});
    }
}


const login = async(req,res) => {
    try{

        const {email,password} = req.body;

        const user = await User.findOne({email : email});
        if (!user) return res.status(400).json({
  success: false,
  message: "Invalid email or password"
});


        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({
  success: false,
  message: "Invalid password"
});


        const token = jwt.sign(
            {
                id : user._id,
                role : user.role
            },
            JWT_SECRET,
            {
                expiresIn : '2h'
            }
        );

        res.status(200).json({
             success: true,
             message: "Login successful",
            token,
            user : {
                id : user._id,
                name : user.name,
                role : user.role
            }
        });

    }catch(err){
        console.error("Error in server:",err);
        return res.status(500).json({
            message : "Server Issue"
        })
    }
};


module.exports = {register,login};

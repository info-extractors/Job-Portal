const jwt = require('jsonwebtoken');
const Job = require('../models/Job');

const verifyToken = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token){
        return res.status(401).json({msg : 'Authorization denied'});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error){
        if (error.name === 'TokenExpiredError'){
            return res.status(401).json({'message' : 'Token expired'})
        }
        res.status(401).json({msg : "Invalid token"});
    }
};


const allowUser = (...roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role)){
            res.status(403).json({msg : 'Access denied'});
        }
        next();
    };
};

const checkJobOwnership = async(req,res,next) => {

    const jobId = req.params.id;

    try{
        const job = await Job.findById(jobId);
        if (!job) return res.status(400).json('Job not found');

        if (job.createdBy.toString() != req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({msg : 'Access denied. Not the job owner'});
        }

        next();
    } catch(error){
        res.status(500).json({msg : 'Server error.'});
    }
};

module.exports = {
    verifyToken,
    allowUser,
    checkJobOwnership,
};


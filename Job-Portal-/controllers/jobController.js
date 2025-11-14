const Job = require('../models/Job');


const getAllJobs = async(req,res) => {
    try{

        const jobs = await Job.find();
        return res.status(200).json(jobs);

    } catch(error){
        console.error("Server Error:",error);
        res.status(500).json({msg:"Server Error"});
    }
}

const createJob = async(req,res) => {
    try{

        const newJob = new Job({
            ...req.body,
            createdBy : req.user.id
        }
        )

        const savedJob = await newJob.save();

        return res.status(200).json(savedJob);

    } catch (error){
        console.error("Server Error:",error);
        res.status(500).json({message :"Server Error"});
    }
}


module.exports = {getAllJobs,createJob};
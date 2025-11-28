const Job = require('../models/Job');
const mongoose = require('mongoose');

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


const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid Job ID" });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ msg: "Job not found" });
        }

        res.status(200).json(job);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
};

const getJobsByUser = async (req, res) => {
    try {
        const { id } = req.params;

        const jobs = await Job.find({ createdBy: id });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this user" });
        }

        res.json({
            count: jobs.length,
            jobs
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


module.exports = {getAllJobs,createJob ,getJobById ,getJobsByUser};
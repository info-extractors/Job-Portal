const Application = require('../models/Application')
const Job = require('../models/Job')

const applyToJob = async(req,res) => {
    try {

        const jobId = req.params.jobId;
        const userId = req.user.id;
        const {coverLetter,resume} = req.body;

        //see if the job already exists 
        const job = await Job.findById(jobId);
        if (!job){
            return res.status(404).json({error : "Job not found"});
        }

        //now check if the job Application already exists 
        const existingJobApplication = await Application.findOne({
            Job : jobId,
            User : userId
        });

        if (existingApplication){
            return res.status(400).json({error : "You have already applied to Job"});
        }

        const application = new Application({
            Job : jobId,
            User : userId,
            coverLetter : coverLetter,
            resume : resume
        });

        res.status(201).json({
            message : "Application submitted successfully",
            application
        })

    } catch (err){
        res.status(500).json({error : 'Server Error'});
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ User: req.user.id })
            .populate('Job', 'title company location')
            .sort({ appliedAt: -1 });
        
        res.status(200).json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {applyToJob , getMyApplications};
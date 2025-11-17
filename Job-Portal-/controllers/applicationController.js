const Application = require('../models/Application')
const Job = require('../models/Job')
const mongoose = require('mongoose');


const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;
    const { coverLetter, resume } = req.body;

    // Validate Job ID
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ error: "Invalid Job ID" });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if already applied
    const existingJobApplication = await Application.findOne({
      Job: jobId,
      User: userId,
    });

    if (existingJobApplication) {
      return res.status(400).json({ error: "You have already applied to this job" });
    }

    // Create application
    const application = new Application({
      Job: jobId,
      User: userId,
      coverLetter,
      resume,
    });

    await application.save(); // IMPORTANT

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
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
const express = require('express')
const router = express.Router();

const {applyToJob ,getMyApplications ,getApplicationsByJobId ,updateApplicationStatus} = require('../controllers/applicationController');
const {verifyToken,allowUser} = require('../middleware/authMiddleware.js')

router.post(
    '/apply/:jobId',
    verifyToken,
    allowUser('jobseeker'),
    applyToJob
);
router.get('/my-applications', verifyToken, getMyApplications);
router.get('/applications/job/:jobId', getApplicationsByJobId);
router.put('/job/:jobId/update-status', updateApplicationStatus);



//ek or Route add karna hoga jo User ki id sa fetch hoga or existing application dikheage 

module.exports = router;
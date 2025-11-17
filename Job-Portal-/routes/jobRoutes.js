const express = require('express')
const router = express.Router();
const {getAllJobs,createJob,getJobById} = require('../controllers/jobController.js')
const {verifyToken,allowUser} = require('../middleware/authMiddleware.js')


router.get('/job/:id',verifyToken,getJobById);
router.get('/getJob',verifyToken,getAllJobs);
router.post('/createJob',verifyToken,allowUser('employer','admin'),createJob);

module.exports = router;
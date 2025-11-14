const express = require('express')
const router = express.Router();
const {getAllJobs,createJob} = require('../controllers/jobController.js')
const {verifyToken,allowUser} = require('../middleware/authMiddleware.js')


router.get('/getJob',verifyToken,getAllJobs);
router.post('/createJob',verifyToken,allowUser('employer','admin'),createJob);

module.exports = router;
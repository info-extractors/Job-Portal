const express = require('express')
const router = express.Router();

const {applyToJob} = require('../controllers/applicationController');
const {verifyToken,allowUser} = require('../middleware/authMiddleware.js')

router.post(
    '/apply/:jobId',
    verifyToken,
    allowUser('jobseeker'),
    applyToJob
);

module.exports = router;
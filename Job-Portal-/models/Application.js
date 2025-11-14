const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    Job : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Job",
        required : true
    },
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    coverLetter:{
        type : String,
        required : true
    },
    resume : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum :['pending','reviewed','accepted','rejected'],
        default : 'pending'
    },
    appliedAt : {type : Date,default : Date.now}
});

module.exports = mongoose.model('Application',applicationSchema)
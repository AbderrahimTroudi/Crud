const { string } = require('joi');
const mongoose = require('mongoose');

const InternshipApplication = new mongoose.Schema({
    internship_ID:{
        type : String,
        required : true,
    
    },
    title:{
        type:String,
        
    },
    candidate_ID:{
        type : String,
        required : true,
    },   
    candidate_name:{
        type : String,
    },  
    status: {
        type: String,
        enum: ['submitted', 'accepted', 'rejected'],
        default: 'submitted'
      }
})
const internshipApplication = mongoose.model('InternshipApplication', InternshipApplication);

module.exports = internshipApplication
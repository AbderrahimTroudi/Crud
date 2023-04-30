const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true,
    
    },
    description:{
        type : String,
        required : true,
    },    
    requirements:{
        type:String,
        required : true
    },
    duration_weeks:{
        type:String,
        required : true
    },
    start_date:{
        type:String,
        required : true
    },
    end_date:{
        type:String,
        required : true
    },
    max_candidates:{
        type:String,
        required : true
    },
    spots_available:{
        type:String,
        required : true
    },
    status:{
        type:String,
        required : true
    },
    category:{
        type:String,
        required : true
    },
    suprivisorid:{
        type:String,
        required : true
    }


})
    const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship
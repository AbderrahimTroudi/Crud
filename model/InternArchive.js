const mongoose = require('mongoose');

const Intern = new mongoose.Schema({
    nameFL:{
        type : String,
        required : true,
    
    },
    email:{
        type : String,
        required : false,
    },    
    password:{
        type:String,
        required : false
    },
    
    phone:{
        type:String,
        required : false
    },
    skills:{
        type:String,
        required : false
    },
    
    resume:{
        type:String,
        required : false
    },
    education:{
        type:String,
        required : false
    },
    aboutme:{
        type:String,
        required : false
    },
    role: {
        type: String,
        default: 'user',
      },
    progressList:{
        type : Array
    },
    created_date: {
        type: Date,
        
    },
    archived_date: {
        type: Date,
   
    }

})
const CondidateArchive = mongoose.model('CondidateArchive', Intern);

module.exports = CondidateArchive
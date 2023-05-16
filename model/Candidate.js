const mongoose = require('mongoose');

const condidate = new mongoose.Schema({
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


    name:{
        type : String
    },
    data:{
        type : Buffer
    },
    contentType:{
        type : String
    },
    progressList:{
        type : Array
    },
    created_date: {
        type: Date,
        default: Date.now
    }

})
const Condidate = mongoose.model('Condidate', condidate);

module.exports = Condidate
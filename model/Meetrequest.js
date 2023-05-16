const { string } = require('joi');
const mongoose = require('mongoose');

const Meetrequest = new mongoose.Schema({
    suprevisor_ID:{
        type : String,
    
    },
    suprevisor_name:{
        type:String,
        
    },
    candidate_ID:{
        type : String,
    },   
    candidate_name:{
        type : String,
    },  
    type: {
        type: String,
        default: 'online'
      },
      decsription:{
        type : String,
    }, 
    reason:{
        type : String,
        required:true
    }, 
    availability:{
        type : String,
    }, 
      date: {
        type: Date,
        default: Date.now
    },
    response:{
        type : String,
        
    },
    comment:{
        type : String,
        
    }
   
   

})
const meetrequest = mongoose.model('Meetrequest', Meetrequest);

module.exports = meetrequest
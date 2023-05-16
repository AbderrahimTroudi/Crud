const mongoose = require('mongoose');

const supSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    
    },
    email:{
        type : String,
        required : true,
    },    
    password:{
        type:String,
        required : true
    },
    role: {
        type: String,
        default: 'suprivisor',
      },
    jobtitle:{  
        type:String,
        required : true
    },
    phone:{
        type:Number,
        required : false
    },
    githublink:{
        type:String,
        required : false
    },
    linkedinlink:{
        type:String,
        required : false
    },
    description:{
        type:String,
        required : false
    },
    speacialty:{
        type:String,
            required : false
        },

    createdAt:{type:Date},
    listofinternship:{
        type:Array,
        required : false
    },
    listofcandidate:{
        type:Array,
        required : false
    },
    archive_date:{type:Date}


    
    
})
const suprivisorArchive = mongoose.model('suprivisorArchive', supSchema);

module.exports = suprivisorArchive
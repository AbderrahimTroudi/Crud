const Joi = require('joi');

const loginvalidation = (data) =>{
    const schema = Joi.object({
        email:Joi.string().min(6).max(30).required().email(),
        password:Joi.string().min(3).max(30).required()
    })
    return schema.validate(data)
    
    }


module.exports.loginvalidation= loginvalidation;
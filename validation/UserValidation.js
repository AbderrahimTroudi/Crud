const Joi = require('joi');
const registration = (data) =>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(30).required(),
        email:Joi.string().min(6).max(30).required().email(),
        password:Joi.string().min(3).max(30).required()
    })
return schema.validate(data)

}
module.exports.registration= registration;


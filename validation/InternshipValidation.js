const Joi = require('joi');
const registration = (data) =>{
    const schema = Joi.object({
        title:Joi.string().min(3).max(30).required(),
        description:Joi.string().min(1).max(300).required(),
        requirements:Joi.string().min(3).max(100).required(),
        duration_weeks:Joi.number().min(3).max(20).required(),
        start_date:Joi.string().required(),
        end_date:Joi.string().required(),
        max_candidates:Joi.number().min(1).max(5).required(),
        spots_available:Joi.number().max(5).required(),
        status:Joi.string().min(3).max(30).valid('open','closed').required(),
        category:Joi.string().max(30).required(),
        suprivisorid:Joi.string().required()

    })
return schema.validate(data)

}
module.exports.registration= registration;


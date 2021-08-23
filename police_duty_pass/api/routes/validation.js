const { boolean } = require('@hapi/joi');
const Joi = require('@hapi/joi');


const adminRegistrationValidation = (data) => {
    const admin = {
        name: Joi.string().min(3).required(),
        email: Joi.required(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(data, admin);
}

const adminLoginValidation = (data) => {
    const admin = {
        email: Joi.required(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(data, admin);
}


const passGenerateValidation = (data) => {
    const pass = {
        id_number: Joi.required(),
        name: Joi.required(),
        photo: Joi.string().valid(['image/jpeg']),
        designation: Joi.required(),
        mobile: Joi.required(),
        company_name: Joi.required(),
        station: Joi.required(),
        duty_place: Joi.required(),
        start_date: Joi.required(),
        end_date: Joi.required(),
        pass_type: Joi.required(),
        lineup: Joi.required(),
        proximity: Joi.required(),
        pass_size: Joi.string(),
        pass_color: Joi.string()

    }

    return Joi.validate(data, pass);
}

module.exports = {
    adminRegistrationValidation,
    adminLoginValidation,
    passGenerateValidation
}
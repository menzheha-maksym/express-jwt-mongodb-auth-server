//VAlidation
const Joi = require('@hapi/joi');

// Register
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

const userNameValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(5).required()
    })

    return schema.validate(data);
}

const emailValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email()
    })

    return schema.validate(data);
}

const passwordValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.userNameValidation = userNameValidation;
module.exports.emailValidation = emailValidation;
module.exports.passwordValidation = passwordValidation;
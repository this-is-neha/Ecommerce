const Joi=require("joi")

    const registerDTO=Joi.object({
    name:Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password:Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).min(8).max(25).required(),
    confirmPassword:Joi.string().valid(Joi.ref('password')).required(),
    role:Joi.string().pattern(/^(customer|admin)$/),
    address:Joi.string().required(),
    image: Joi.string().optional()
    })
    const loginDTO=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })

    module.exports={registerDTO,loginDTO}
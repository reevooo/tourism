import Joi from 'joi'; // For validating inputs

export const validateSignup = (data) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid('User', 'Admin'),
    });
    return schema.validate(data);
  };
  
  export const validateLogin = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  };
  
  export const validateChangePassword = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        currentPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

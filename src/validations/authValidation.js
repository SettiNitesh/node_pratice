import Joi from "joi";

const commonSchema = {
  email: Joi.string()
    .required()
    .email({ tlds: false })
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"))
    .messages({
      "string.email": "invalid email address",
      "string.empty": "email cannot be empty",
      "any.required": "email is required",
    }),

  password: Joi.string()
    .required()
    .min(5)
    .max(16)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .messages({
      "string.empty": "password cannot be empty",
      "string.min": "password must be at least {#limit} characters long",
      "string.max": "password cannot exceed {#limit} characters",
      "any.required": "password is required",
    }),
};

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    "string.empty": "name cannot be empty",
    "string.min": "name must be at least {#limit} characters long",
    "string.max": "name cannot exceed {#limit} characters",
    "any.required": "name is required",
  }),
  ...commonSchema,
});

const loginSchema = Joi.object(commonSchema);

export { loginSchema, registerSchema };

import joi from "joi";

const registerSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    // .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required(),
  confirm_password: joi
    .string()
    .valid(joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password must match password",
    }),
  role: joi.string().valid("user", "admin").default("user"),
  addresses: joi.array().items(
    joi
      .object({
        street: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
        zip_code: joi.string().required(),
        country: joi.string().required(),
      })
      .default([]),
  ),
  contact_info: joi
    .object({
      phone: joi.string().required(),
      alternate_email: joi.string().email(),
    })
    .default({ phone: "" }),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export default {
  registerSchema,
  loginSchema,
};

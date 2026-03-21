import joi from "joi";

const paymentMethodSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  description: joi.string().max(255).optional(),
});

export default {
  paymentMethodSchema,
};

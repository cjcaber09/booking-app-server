import joi from "joi";

const createRoomSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  description: joi.string().max(500).optional(),
  price: joi.number().positive().required(),
  capacity: joi.number().integer().positive().required(),
  amenities: joi
    .array()
    .items(
      joi.object({
        name: joi.string().min(2).max(100).required(),
        description: joi.string().max(500).optional(),
      }),
    )
    .optional(),
  images: joi
    .array()
    .items(
      joi.object({
        url: joi.string().uri().required(),
        alt: joi.string().max(255).optional(),
      }),
    )
    .optional(),
});

export default {
  createRoomSchema,
};

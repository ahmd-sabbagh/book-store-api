const mongoose = require("mongoose");
const Joi = require("joi");

const authersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    image: {
      type: String,
      default: "avatar-image.png",
    },
  },
  {
    timestamps: true,
  },
);

const Auther = mongoose.model("Auther", authersSchema);

// Validate Create Auther
function validateCreateNewAuthers(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(30).required(),
    lastName: Joi.string().trim().min(3).max(30).required(),
    nationality: Joi.string().trim().min(2).max(30).required(),
    image: Joi.string(),
  });

  return schema.validate(obj);
}
// Validate Update Auther
function validateUpdateAuthers(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(30),
    lastName: Joi.string().trim().min(3).max(30),
    nationality: Joi.string().trim().min(2).max(30),
    image: Joi.string(),
  });

  return schema.validate(obj);
}

module.exports = {
  Auther,
  validateCreateNewAuthers,
  validateUpdateAuthers
};

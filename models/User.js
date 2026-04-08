const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

// User Model
const User = mongoose.model("User", UserSchema);

// Validation
function createNewUser(obj) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(100).trim().required(),
    email: Joi.string().min(5).max(50).trim().required().email(),
    password: Joi.string().min(5).trim().required(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);
}
function updateUser(obj) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(100).trim(),
    email: Joi.string().min(5).max(50).trim().email(),
    password: Joi.string().min(5).trim(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);
}
function loginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).trim().required().email(),
    password: Joi.string().min(5).trim().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  createNewUser,
  updateUser,
  loginUser,
};

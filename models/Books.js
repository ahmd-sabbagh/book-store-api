const mongoose = require("mongoose");
const Joi = require("joi");

const booksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
      minlength: 5,
      required:true
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      minlength: 5,
      required: true,
    },
    auther: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"Auther"
    },
    description: {
      type: String,
      trim: true,
      maxlength: 100,
      minlength: 20,
      required: true,
    },
    image: {
      type: String,
      default: "avatar.png",
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

const Books = mongoose.model("Books", booksSchema);

// ============================validation ==============

function createBooksValidation(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(5).max(100).required(),
    title: Joi.string().trim().min(5).max(100).required(),
    description: Joi.string().trim().min(20).max(100).required(),
    image: Joi.string(),
    auther:Joi.string()
  });
  return schema.validate(obj);
}
function updateBooksValidation(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(5).max(100),
    title: Joi.string().trim().min(5).max(100),
    description: Joi.string().trim().min(20).max(100),
    image: Joi.string(),
    auther:Joi.string()
  });
  return schema.validate(obj);
}

module.exports = {
  Books,
  createBooksValidation,
  updateBooksValidation,
};

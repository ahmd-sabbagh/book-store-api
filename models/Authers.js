const mongoose = require("mongoose");

const authersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    nationality: {
      type: String,
      require: true,
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

module.exports = {
  Auther,
};

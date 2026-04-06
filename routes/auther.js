const express = require("express");
const Joi = require("joi");
const router = express.Router();

const { Auther } = require("../models/Authers");

// Auther

const authers = [
  {
    id: 1,
    firstName: "ahmed",
    lastName: "said",
    nationality: "egypt",
    image: "default-image.png",
  },
];

/**
 * @desc Get All Authers
 * @router /api/authers
 * @method Get
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const authersList = await Auther.find();
    res.status(200).json(authersList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

/**
 * @desc Get Authers By Id
 * @router /api/authers/:id
 * @method Get
 * @access public
 */

router.get("/:id", async (req, res) => {
  try {
    const auther = await Auther.findById(req.params.id);
    if (auther) {
      res.status(200).json(auther);
    } else {
      res.status(404).json({ message: "auther not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

/**
 * @desc Create New Auther
 * @router /api/authers
 * @method Post
 * @access public
 */

router.post("/", async (req, res) => {
  const { error } = validateCreateNewAuthers(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const auther = new Auther({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await auther.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});
/**
 * @desc Update Auther
 * @router /api/authers/:id
 * @method Put
 * @access public
 */

router.put("/:id", async (req, res) => {
  const { error } = validateUpdateAuthers(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const newAuther = await Auther.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      {
        new: true,
      },
    );
    res.status(201).json(newAuther)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

// Validate Create Auther
function validateCreateNewAuthers(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(50).required(),
    lastName: Joi.string().trim().min(3).max(40).required(),
    nationality: Joi.string().trim().min(3).max(100).required(),
    image: Joi.string().trim().min(3).max(100),
  });

  return schema.validate(obj);
}
// Validate Update Auther
function validateUpdateAuthers(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(50),
    lastName: Joi.string().trim().min(3).max(40),
    nationality: Joi.string().trim().min(3).max(100),
    image: Joi.string().trim().min(3).max(100),
  });

  return schema.validate(obj);
}

module.exports = router;

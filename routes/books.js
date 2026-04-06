const express = require("express");
const Joi = require("joi");
const router = express.Router();

// books
const books = [
  {
    id: 1,
    title: "Clean Code",
    name: "Robert C. Martin",
    description:
      "A book that explains best practices for writing clean, maintainable, and readable code.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    name: "James Clear",
    description:
      "A guide to building good habits and breaking bad ones using small daily improvements.",
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    name: "Andrew Hunt",
    description:
      "A classic book for developers that teaches practical thinking and software craftsmanship.",
  },
  {
    id: 4,
    title: "Deep Work",
    name: "Cal Newport",
    description:
      "A book about the power of focused work and how to eliminate distractions to achieve more.",
  },
  {
    id: 5,
    title: "You Don't Know JS",
    name: "Kyle Simpson",
    description:
      "A deep dive into JavaScript concepts that helps developers truly understand the language.",
  },
];

/**
 * @desc Get All Books
 * @router /api/books
 * @method Get
 * @access public
 */
router.get("/", (req, res) => {
  res.status(200).json(books);
});
/**
 * @desc Single Book By Id
 * @router /api/books/:id
 * @method Get
 * @access public
 */
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book is not found" });
  }
});
/**
 * @desc Create New Book
 * @router /api/books
 * @method Post
 * @access public
 */
router.post("/", (req, res) => {
  const { error } = validateCreateNewBook(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    name: req.body.name,
    description: req.body.description,
  };
  books.push(book);
  res.status(201).json(book);
});
/**
 * @desc Update Any Book
 * @router /api/books/:id
 * @method Put
 * @access public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (book) {
    res.status(201).json({ message: "the book has been updated" });
  } else {
    res.status(404).json({ message: "not found" });
  }
});


/**
 * @desc delete Any Book
 * @router /api/books/:id
 * @method Delete
 * @access public
 */

router.delete("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (book) {
    res.status(201).json({ message: "the book has been deleted" });
  } else {
    res.status(404).json({ message: "not found" });
  }
});

// Validate Create New Book
function validateCreateNewBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(50).required().messages({
      "string.empty": "العنوان فاضي",
      "string.min": "لازم العنوان يكون اكبر من 3 حروف",
      "string.max": "العنوان ميكونش اكتر من 50 حرف",
      "any.required": "العنوان مطلوب",
    }),

    name: Joi.string().trim().min(3).max(40).required().messages({
      "string.min": "الاسم لازم يكون اكبر من 3 حروف",
      "string.max": "الاسم ميكونش اكتر من 40 حرف",
      "any.required": "الاسم مطلوب",
    }),

    description: Joi.string().trim().min(3).max(100).required().messages({
      "string.min": "الوصف لازم يكون اكبر من 3 حروف",
      "string.max": "الوصف ميكونش اكتر من 100 حرف",
      "any.required": "الوصف مطلوب",
    }),
  });

  return schema.validate(obj);
}
// Validate Update Book
function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(50),

    name: Joi.string().trim().min(3).max(40),

    description: Joi.string().trim().min(3).max(100),
  });

  return schema.validate(obj);
}

module.exports = router;

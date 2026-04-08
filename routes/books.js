const express = require("express");
const {
  Books,
  createBooksValidation,
  updateBooksValidation,
} = require("../models/Books");

// Router
const router = express.Router();

// Get all books

/**
 * @desc Get all books
 * @router /api/books
 * @method Get
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const booksList = await Books.find().populate("auther", [
      "id",
      "firstName",
      "lastName",
    ]);
    res.status(200).json(booksList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

/**
 * @desc Get book by id
 * @router /api/books/:id
 * @method Get
 * @access public
 */

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const book = await Books.findById(req.params.id).populate("auther");
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book is not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

/**
 * @desc Create a new book
 * @router /api/books
 * @method Post
 * @access public
 */

router.post("/", async (req, res) => {
  const { error } = createBooksValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const book = new Books({
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      auther: req.body.auther,
    });
    const result = await book.save();
    res.status(201).json({ message: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

/**
 * @desc Update Book
 * @router /api/books/:id
 * @method Put
 * @access public
 */

router.put("/:id", async (req, res) => {
  const { error } = updateBooksValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const newBook = await Books.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          title: req.body.title,
          description: req.body.description,
          image: req.body.image,
          auther: req.body.auther,
        },
      },
      {
        new: true,
      },
    );
    res.status(201).json({
      success: true,
      message: "the book hasbeen updated",
      data: newBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

/**
 * @desc Delete Book
 * @router /api/books/:id
 * @method Delete
 * @access public
 */

router.delete("/:id", async (req, res) => {
  try {
    const book = await Books.findByIdAndDelete(req.params.id);
    if (book) {
      res
        .status(200)
        .json({ message: "the book has been deleted", data: book });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

module.exports = router;

import BookModel from "../models/book.js";

// Add New Book
export const addBook = async (req, res) => {
  try {
    const body = req.body;
    let newBook = new BookModel(body);
    newBook.save();
    res.status(200).json({ message: "Book Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Book
export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const Book = await Book.findById(id);
    res.status(200).json(Book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Books
export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await BookModel.find();
    res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {
    console.log("Here");
    const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    console.log(req.params.id);
    const deletedBook = await BookModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBook);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

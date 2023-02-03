import mongoose from "mongoose";
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  noOfPages: {
    type: Number,
    require: true,
  },
  publishedDate: {
    type: String,
    require: true,
  },
  dateCreated: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});
const Book = mongoose.model("Book", bookSchema);

export default Book;

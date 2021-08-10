import { configureStore } from "@reduxjs/toolkit";
import booksReduce from "./BookSlicer";
import SingleBookSlice from "./SingleBookSlice";

export default configureStore({
  reducer: { books: booksReduce, singleBook: SingleBookSlice },
});

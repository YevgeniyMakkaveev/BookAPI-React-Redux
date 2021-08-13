import { configureStore } from "@reduxjs/toolkit";
import BooksSlice from "./BookSlicer";
import SingleBookSlice from "./SingleBookSlice";

export default configureStore({
  reducer: { books: BooksSlice, singleBook: SingleBookSlice },
});

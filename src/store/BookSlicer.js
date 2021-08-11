import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "bookSlice/getInit",
  async function (params, { rejectWithValue, dispatch }) {
    const { title, field, priority } = params;
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=30&orderBy=${priority}&subject=${field}:keyes&key=AIzaSyAse8WG5nA-_-AdTK_4wpa4CUF5fmqc8zE`
      );
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();

      dispatch(
        getInitBooks({
          books: data.items,
          total: data.totalItems,
          title,
          field,
          priority,
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchMoreBooks = createAsyncThunk(
  "bookSlice/getMore",
  async function (_, { rejectWithValue, getState }) {
    const state = getState();
    const { name, field, priority, total, books } = state.books;
    const index = books.length;

    if (index >= total) {
      return null;
    }
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${name}&startIndex=${index}&maxResults=30&orderBy=${priority}&subject=${field}:keyes&key=AIzaSyAse8WG5nA-_-AdTK_4wpa4CUF5fmqc8zE`
      );
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      const finalData = books.concat(data.items);
      return finalData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.loading = false;
  state.errorMsg = action.payload;
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState: {
    name: "",
    field: "all",
    priority: "relevance",
    total: null,
    loading: null,
    books: null,
    errorMsg: null,
  },
  reducers: {
    getInitBooks(state, action) {
      const { title, field, priority, books, total } = action.payload;
      state.name = title;
      state.field = field;
      state.priority = priority;
      state.books = books;
      state.total = total;
      state.loading = false;
      state.errorMsg = null;
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.loading = true;
      state.errorMsg = null;
    },
    [fetchBooks.rejected]: setError,
    [fetchMoreBooks.pending]: (state) => {
      state.loading = true;
    },
    [fetchMoreBooks.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.books = action.payload;
      }
    },
  },
});

const { getInitBooks } = bookSlice.actions;
export default bookSlice.reducer;

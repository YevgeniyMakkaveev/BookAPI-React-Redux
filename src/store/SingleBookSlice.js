import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleBooks = createAsyncThunk(
  "singleBookSlice/getBook",
  async function (params, { rejectWithValue, dispatch }) {
    console.log(params);
    try {
      const response = await fetch(params);
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const book = await response.json();
      console.log(book);
      dispatch(
        getSelecedBook({
          data: book,
          loading: null,
          errorMsg: null,
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const SingleBookSlice = createSlice({
  name: "singleBookSlice",
  initialState: {
    data: null,
    loading: null,
    errorMsg: null,
  },
  reducers: {
    getSelecedBook(state, action) {
      state.data = action.payload.data;
      state.loading = null;
      state.errorMsg = null;
      console.log(state.data);
    },
    removeSelecedBook(state) {
      state.data = null;
      state.loading = false;
      state.errorMsg = null;
    },
  },
  extraReducers: {
    [fetchSingleBooks.pending]: (state) => {
      state.errorMsg = false;
      state.loading = true;
    },
    [fetchSingleBooks.rejected]: (state, action) => {
      state.errorMsg = action.payload;
      state.loading = false;
    },
  },
});
const { getSelecedBook } = SingleBookSlice.actions;
export const { removeSelecedBook } = SingleBookSlice.actions;
export default SingleBookSlice.reducer;

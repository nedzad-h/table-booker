import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  date: ""
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  }
})

export const { setSearchTerm, setDate } = searchSlice.actions;
export default searchSlice.reducer;
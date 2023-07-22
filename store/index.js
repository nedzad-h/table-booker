import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./searchSlice";
import { reservationApi } from "./bookingApi";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    // reservationApi: reservationApi.reducer
  },
  // middleware(getDefaultMiddleware) {
  //   return getDefaultMiddleware().concat(reservationApi.middleware);
  // }
});


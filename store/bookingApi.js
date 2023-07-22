import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/reservations" }),
  tagTypes: ["reservation"],
  endpoints: (builder) => ({
    search: builder.query({
      query: (q) => `searchName?name=${q}`,
      providesTags: (result, error, search) => [{ type: "reservation", search }],
    }),
  }),
});
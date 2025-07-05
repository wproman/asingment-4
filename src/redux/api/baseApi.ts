import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type ApiResponse, type Book, type Borrow } from "./types";

export const booksApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://b5-assignment-03.vercel.app/api",
  }),
  tagTypes: ["Books", "Borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
      providesTags: ["Books"],
      transformResponse: (response: { data: Book[] }) => response.data,
    }),
    getBook: builder.query<ApiResponse<Book>, string>({
      query: (id) => `/books/${id}`,
    }),

    addBook: builder.mutation<Book, Omit<Book, "id">>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<Book, Book>({
      query: ({ _id, ...rest }) => ({
        url: `/books/${_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    borrowBook: builder.mutation<
      Borrow,
      { book: string; quantity: number; dueDate: string }
    >({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Books", "Borrow"],
    }),
    returnBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/borrows/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books", "Borrow"],
    }),
    getBorrows: builder.query<Borrow[], void>({
      query: () => "/borrows",
      providesTags: ["Borrow"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow", // Adjust path based on your backend
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useReturnBookMutation,
  useGetBorrowsQuery,
  useGetBorrowSummaryQuery,
} = booksApi;

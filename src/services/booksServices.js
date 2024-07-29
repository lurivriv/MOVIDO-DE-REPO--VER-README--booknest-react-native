import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseUrl } from "../databases/realTimeDataBase.js"

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books.json",
      transformResponse: (res) => {
        if (res) {
          return Object.keys(res).map(id => ({ id, ...res[id] }))
        }
        return []
      },
      providesTags: [{ type: "Books", id: "bookList" }]
    }),
    getBookById: builder.query({
      query: (bookId) => `books/${bookId}.json`,
      transformResponse: (res) => res,
      providesTags: (result) => [{ type: "Books", id: result?.id }]
    }),
    postBook: builder.mutation({
      query: (book) => ({
        url: "books.json",
        method: "POST",
        body: book
      }),
      invalidatesTags: [{ type: "Books", id: "bookList" }]
    }),
    putBook: builder.mutation({
      query: ({ bookId, ...book }) => ({
        url: `books/${bookId}.json`,
        method: "PUT",
        body: book
      }),
      invalidatesTags: (result) => [{ type: "Books", id: result?.id }]
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `books/${bookId}.json`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Books", id: "bookList" }]
    }),
    getReadingFormat: builder.query({
      query: () => "readingFormat.json"
    }),
    getLiteraryTropes: builder.query({
      query: () => "literaryTropes.json"
    })
  })
})

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  usePostBookMutation,
  usePutBookMutation,
  useDeleteBookMutation,
  useGetReadingFormatQuery,
  useGetLiteraryTropesQuery
} = bookApi
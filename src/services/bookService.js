import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseUrl } from "../databases/realTimeDataBase.js"

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["booksGet", "profileImageGet", "bookImageGet"],
  endpoints: (builder) => ({
    getBooksByUser: builder.query({
      query: (user) => `books.json?orderBy="user"&equalTo="${user}"`,
      transformResponse: (res) => {
        if (!res) return []
        return Object.keys(res).map(id => ({ id, ...res[id] }))
      },
      providesTags: [{ type: "booksGet", id: "bookList" }]
    }),
    getBookById: builder.query({
      query: (bookId) => `books/${bookId}.json`,
      transformResponse: (res) => res,
      providesTags: (result) => [{ type: "booksGet", id: result?.id }]
    }),
    postBook: builder.mutation({
      query: ({ ...book }) => ({
        url: "books.json",
        method: "POST",
        body: book
      }),
      invalidatesTags: [{ type: "booksGet", id: "bookList" }]
    }),
    putBook: builder.mutation({
      query: ({ bookId, ...book }) => ({
        url: `books/${bookId}.json`,
        method: "PUT",
        body: book
      }),
      invalidatesTags: (result) => [{ type: "booksGet", id: result?.id }]
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `books/${bookId}.json`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "booksGet", id: "bookList" }]
    }),
    getReadingFormat: builder.query({
      query: () => "readingFormat.json"
    }),
    getLiteraryTropes: builder.query({
      query: () => "literaryTropes.json"
    }),
    getBookImage: builder.query({
      query: (bookId) => `books/${bookId}.json`,
      providesTags: ["bookImageGet"]
    }),
    postBookImage: builder.mutation({
      query: ({ imageBook, bookId }) => ({
        url: `books/${bookId}.json`,
        method: "PATCH",
        body: {
          image: imageBook
        }
      }),
      invalidatesTags: ["bookImageGet"]
    }),
    deleteBookImage: builder.mutation({
      query: (bookId) => ({
        url: `books/${bookId}/image.json`,
        method: "DELETE"
      }),
      invalidatesTags: ["bookImageGet"]
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImage/${localId}.json`,
      providesTags: ["profileImageGet"]
    }),
    postProfileImage: builder.mutation({
      query: ({ imageProfile, localId }) => ({
        url: `profileImage/${localId}.json`,
        method: "PUT",
        body: {
          image: imageProfile
        }
      }),
      invalidatesTags: ["profileImageGet"]
    }),
    deleteProfileImage: builder.mutation({
      query: (localId) => ({
        url: `profileImage/${localId}.json`,
        method: "DELETE"
      }),
      invalidatesTags: ["profileImageGet"]
    })
  })
})

export const {
  useGetBooksByUserQuery,
  useGetBookByIdQuery,
  usePostBookMutation,
  usePutBookMutation,
  useDeleteBookMutation,
  useGetReadingFormatQuery,
  useGetLiteraryTropesQuery,
  useGetBookImageQuery,
  usePostBookImageMutation,
  useDeleteBookImageMutation,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
  useDeleteProfileImageMutation
} = bookApi
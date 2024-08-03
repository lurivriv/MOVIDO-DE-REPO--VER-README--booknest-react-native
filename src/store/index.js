import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from "../features/User/UserSlice.js"
import booksReducer from "../features/Books/BooksSlice.js"
import { authApi } from "../services/authService.js"
import { bookApi } from "../services/bookService.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,

    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      .concat(authApi.middleware)
      .concat(bookApi.middleware)
})

setupListeners(store.dispatch)

export default store
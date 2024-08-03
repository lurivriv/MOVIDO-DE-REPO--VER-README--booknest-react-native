import { createSlice } from "@reduxjs/toolkit"

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    value: [],
    itemSelected: "",
    imageCameraBook: ""
  },
  reducers: {
    setBooks: (state, { payload }) => {
      state.value = payload
    },
    setItemSelected: (state, { payload }) => {
      state.itemSelected = payload
    },
    clearItemSelected: (state) => {
      state.itemSelected = ""
    },
    setCameraImageBook: (state, { payload }) => {
      const { bookId, image } = payload
      state.value = state.value.map(book => book?.id === bookId ? imageCameraBook : image)
    },
    addBook: (state, { payload }) => {
      state.value.push(payload)
    },
    updateBook: (state, { payload }) => {      
      state.value = state.value.map(book => book?.id === payload.id ? payload : book)
    },
    removeBook: (state, { payload }) => {
      state.value = state.value.filter(book => book?.id !== payload)
    }
  }
})

export const {
  setBooks,
  setItemSelected,
  clearItemSelected,
  setCameraImageBook,
  addBook,
  updateBook,
  removeBook
} = booksSlice.actions

export default booksSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import initialBooks from '../data/books'

// Books slice manages the full list of books in Redux state
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    list: initialBooks, // starts with the dummy data
  },
  reducers: {
    // Add a new book to the beginning of the list
    addBook: (state, action) => {
      state.list.unshift(action.payload)
    },
  },
})

export const { addBook } = booksSlice.actions

// Selectors
export const selectAllBooks = (state) => state.books.list
export const selectBookById = (id) => (state) =>
  state.books.list.find((b) => b.id === Number(id))
export const selectCategories = (state) => [
  ...new Set(state.books.list.map((b) => b.category)),
]

export default booksSlice.reducer

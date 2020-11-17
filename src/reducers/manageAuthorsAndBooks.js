// need to import uuid to be able to create new author ids
// from new books
import uuid from "uuid"

// produces a reducer that returns a state with
// the return values of authorsReducer() and booksReducer()
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  authors: authorsReducer,
  books: booksReducer
})

export default rootReducer

// returns author state depending on given action
function authorsReducer(state = [], action) {
  let idx;
  switch(action.type) {
      case "ADD_AUTHOR":
        return [...state, action.author]

      case "REMOVE_AUTHOR":
        idx = state.findIndex(author => author.id === action.id)
          return [...state.slice(0, idx), ...state.slice(idx + 1)]

      case "ADD_BOOK":
        let existingAuthor = state.filter(
          author => author.authorName === action.book.authorName
        )
        if (existingAuthor.length > 0) {
          return state
        } else {
          return [...state, { authorName: action.book.authorName, id: uuid() }]
        }

      default:
        return state
  }
}

// returns book state depending on given action
function booksReducer(state = [], action) {
  let idx;
  switch(action.type) {
      case "ADD_BOOK":
        return [...state, action.book]

      case "REMOVE_BOOK":
        idx = state.findIndex(book => book.id === action.id)
          return [...state.slice(0, idx), ...state.slice(idx + 1)]

      default:
        return state
  }
}

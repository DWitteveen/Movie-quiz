import { GET_QUESTION_BY_ID } from '../actions/games'

export default function (state = [], action) {
    switch (action.type) {
      case GET_QUESTION_BY_ID:
      return action.payload
  
      default:
      return state
    }
  }
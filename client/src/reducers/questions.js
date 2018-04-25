import { FETCHED_ALL_QUESTIONS } from '../actions/games'

export default function (state = [], action) {
    switch (action.type) {
      case FETCHED_ALL_QUESTIONS:
      return action.payload
  
      default:
      return state
    }
  }

  
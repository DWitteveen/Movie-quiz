import { ROUND_UP } from '../actions/games'

export default function (state = [], action) {
    switch (action.type) {
      case ROUND_UP:
      return action.payload
  
      default:
      return state
    }
  }

import { RESULT } from '../actions/result'

export const initialState = {
  result: [],
}

export const resultData = (state = initialState, action) => {
  switch (action.type) {
    case RESULT:
      return {
        result: action.payload,
      }
    default:
      return state
  }
}

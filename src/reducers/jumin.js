import { JUMIN } from '../actions/jumin'

export const initialState = {
  jumin: '',
}

export const jumin = (state = initialState, action) => {
  switch (action.type) {
    case JUMIN:
      return {
        jumin: action.payload,
      }
    default:
      return state
  }
}

import { EXISTCAR } from '../actions/existCar'

export const initialState = {
  existCarArr: [],
}

export const existCar = (state = initialState, action) => {
  switch (action.type) {
    case EXISTCAR:
      return {
        existCarArr: action.payload,
      }
    default:
      return state
  }
}

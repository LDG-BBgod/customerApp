import { SETPHONE } from '../actions/phone'

export const initialState = {
  phone: '',
}

export const phone = (state = initialState, action) => {
  switch (action.type) {
    case SETPHONE:
      return {
        phone: action.payload,
      }
    default:
      return state
  }
}

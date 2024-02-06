import { ISMOBILE, ISLOGIN } from '../actions/dealer'

export const initialState = {
  isMobile: true,
  isLogin: false,
}

export const dealer = (state = initialState, action) => {
  switch (action.type) {
    case ISMOBILE:
      return {
        ...state,
        isMobile: action.payload,
      }
    case ISLOGIN:
      return {
        ...state,
        isLogin: action.payload,
      }
    default:
      return state
  }
}

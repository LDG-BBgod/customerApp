import {
  ISOPEN,
  CONTENT,
  BUTTONTEXT,
  BUTTONFUNC,
  CLOSE,
} from '../actions/modal'

export const initialState = {
  isOpen: false,
  content: '',
  buttonText: '',
  buttonFunc: null,
}

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case ISOPEN:
      return {
        ...state,
        isOpen: action.payload,
      }
    case CONTENT:
      return {
        ...state,
        content: action.payload,
      }
    case BUTTONTEXT:
      return {
        ...state,
        buttonText: action.payload,
      }
    case BUTTONFUNC:
      return {
        ...state,
        buttonFunc: action.payload,
      }
    case CLOSE:
      return initialState
    default:
      return state
  }
}

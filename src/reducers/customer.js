import { CSNAME, PHONEAUTH, PHONESEND, FSN, BSN, LIST } from '../actions/customer'

export const initialState = {
  csname: '',
  phoneAuth: '',
  phoneSend: '',
  fsn: '',
  bsn: '',
  list: '',
}

export const customer = (state = initialState, action) => {
  switch (action.type) {
    case CSNAME:
      return {
        ...state,
        csname: action.payload,
      }
    case PHONEAUTH:
      return {
        ...state,
        phoneAuth: action.payload,
      }
    case PHONESEND:
      return {
        ...state,
        phoneSend: action.payload,
      }
    case FSN:
      return {
        ...state,
        fsn: action.payload,
      }
    case BSN:
      return {
        ...state,
        bsn: action.payload,
      }
    case LIST:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

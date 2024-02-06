import {
  CARVALUE1,
  CARVALUE2,
  CARVALUE3,
  CARVALUE4,
  CARVALUE5,
} from '../actions/carInfo'

export const initialState = {
  carValue1: '',
  carValue2: '',
  carValue3: '',
  carValue4: '',
  carValue5: '',
}

export const changeCarInfo = (state = initialState, action) => {
  switch (action.type) {
    case CARVALUE1:
      return {
        ...state,
        carValue1: action.payload,
      }
    case CARVALUE2:
      return {
        ...state,
        carValue2: action.payload,
      }
    case CARVALUE3:
      return {
        ...state,
        carValue3: action.payload,
      }
    case CARVALUE4:
      return {
        ...state,
        carValue4: action.payload,
      }
    case CARVALUE5:
      return {
        ...state,
        carValue5: action.payload,
      }
    default:
      return state
  }
}

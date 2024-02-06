import { applyMiddleware, combineReducers, createStore } from 'redux'


import { changeCarInfo } from '../reducers/carInfo'
import { carSelectComplete } from '../reducers/carSelectComplete'
import { dealer } from '../reducers/dealer'
import { phone } from '../reducers/phone'
import { jumin } from '../reducers/jumin'
import { resultData } from '../reducers/resultData'
import { customer } from '../reducers/customer'
import { modal } from '../reducers/modal'
import { existCar } from '../reducers/existCar'

import logger from 'redux-logger'

const rootReducer = combineReducers({
  changeCarInfo,
  carSelectComplete,
  dealer,
  phone,
  jumin,
  resultData,
  customer,
  modal,
  existCar,
})

// const store = createStore(rootReducer, applyMiddleware(logger))
const store = createStore(rootReducer)

export default store

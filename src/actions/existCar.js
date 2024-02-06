export const EXISTCAR = 'EXISTCAR'

export const setExistCar = (arr) => {
  return {
    type: EXISTCAR,
    payload: arr,
  }
}

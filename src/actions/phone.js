export const SETPHONE = 'SETPHONE'

export const setPhone = (text) => {
  return {
    type: SETPHONE,
    payload: text,
  }
}
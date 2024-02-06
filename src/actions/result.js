export const RESULT = 'RESULT'

export const setResult = (arr) => {
  for (let obj of arr) {
    if (obj.money.length >= 15) {
      obj.money = '조회불가'
    }
  }
  return {
    type: RESULT,
    payload: arr,
  }
}

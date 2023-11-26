export const JUMIN = 'JUMIN'

export const setJumin = (text) => {
  function generateFullResidentNumber(frontSixDigits) {
    const currentYear = new Date().getFullYear()
    const birthYearPrefix = frontSixDigits.substring(0, 2)
    const birthYear =
      parseInt(birthYearPrefix) < currentYear % 100
        ? '20'
        : '19'

    return birthYear + frontSixDigits
  }
  return {
    type: JUMIN,
    payload: generateFullResidentNumber(text),
  }
}

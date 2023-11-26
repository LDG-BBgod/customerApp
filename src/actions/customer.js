export const CSNAME = 'CSNAME'
export const PHONEAUTH = 'PHONEAUTH'
export const PHONESEND = 'PHONESEND'
export const FSN = 'FSN'
export const BSN = 'BSN'
export const LIST = 'LIST'

export const changeCSName = (text) => {
  return {
    type: CSNAME,
    payload: text,
  }
}
export const changePhoneAuth = (text) => {
  return {
    type: PHONEAUTH,
    payload: text,
  }
}
export const changePhoneSend = (text) => {
  return {
    type: PHONESEND,
    payload: text,
  }
}
export const changeFsn = (text) => {
  return {
    type: FSN,
    payload: text,
  }
}
export const changeBsn = (text) => {
  return {
    type: BSN,
    payload: text,
  }
}
export const changeList = (text) => {
  return {
    type: LIST,
    payload: text,
  }
}

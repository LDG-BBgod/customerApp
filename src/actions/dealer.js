export const ISMOBILE = 'ISMOBILE'
export const ISLOGIN = 'ISLOGIN'

export const changeIsMobile = (boolean) => {
  return {
    type: ISMOBILE,
    payload: boolean,
  }
}

export const changeIsLogin = (boolean) => {
  return {
    type: ISLOGIN,
    payload: boolean,
  }
}

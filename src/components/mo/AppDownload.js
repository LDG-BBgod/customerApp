import { styled } from 'styled-components'
import { useEffect, useState } from 'react'

import Spacer from './Spacer'

const AppDownload = ({ Func = null }) => {

  return (
    <Box onClick={Func}>
      <img src="/img/buttonLogo.svg" alt="logo" width={20} height={20} />
      <Spacer horizontal={false} space={10} />
      <Text>앱 다운로드</Text>
      <Spacer horizontal={false} space={5} />
      <img src="/img/download.svg" alt="down" width={9.5} height={11.5} />
    </Box>
  )
}

export default AppDownload

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 145px;
  height: 34px;
  border-radius: 5px;
  background-color: #5cdaa7;
`

const Text = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`

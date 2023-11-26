import React from 'react'
import styled from 'styled-components'

const MainHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Text = styled.div`
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-left: auto;
`

const MobileHeader = () => {
  return (
    <MainHeader>
      <img
        src="/img/logo_white.svg"
        alt="logo"
        style={{ width: 53, height: 40 }}
      />
      <Text
        onClick={() => {
          window.location.href = `tel:044-715-7442`
        }}
      >
        대표 상담번호 044-715-7442
      </Text>
    </MainHeader>
  )
}
export default MobileHeader

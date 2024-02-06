import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const MainSection = ({ children }) => {
  const { isMobile } = useSelector((state) => state.dealer)

  return (
    <div>
      {isMobile ? (
        <SafeArea>{children}</SafeArea>
      ) : (
        <div style={{ width: 600, margin:'0 auto'}}>
          <SafeArea>{children}</SafeArea>
        </div>
      )}
    </div>
  )
}
export default MainSection

const SafeArea = styled.div`
  box-sizing: border-box;
  padding: 20px 25px 0 25px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

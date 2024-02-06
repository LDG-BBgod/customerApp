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
  color: #5b8def;
  margin-left: auto;
`

const StepHeader = ({ src }) => {
  return (
    <MainHeader>
      <img
        src="/img/logo_blue.svg"
        alt="logo"
        style={{ width: 53, height: 40 }}
      />
      <div
        style={{
          marginLeft: 'auto',
          height: 40,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Text onClick={()=>{
          window.location.href = `tel:044-715-7442`
        }}>대표 상담번호 044-715-7442</Text>
        <img
          src={src}
          alt="step"
          height={12}
          width={84}
          style={{ marginLeft: 'auto' }}
        />
      </div>
    </MainHeader>
  )
}
export default StepHeader

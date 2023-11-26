import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import Spacer from './Spacer'

function replaceNewlinesWithBr(text) {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ))
}

const ModalScreen = ({
  content = null,
  buttonText = '',
  buttonFunc = null,
}) => {
  const { isMobile } = useSelector((state) => state.dealer)

  return (
    <div>
      {isMobile ? (
        <ModalContainer>
          <ModalContent>
            <Text>{replaceNewlinesWithBr(content)}</Text>
            <Spacer space={25} />
            <CSButton onClick={buttonFunc}>{buttonText}</CSButton>
          </ModalContent>
        </ModalContainer>
      ) : (
        <ModalContainer>
          <ModalContent2>
            <Text>{replaceNewlinesWithBr(content)}</Text>
            <Spacer space={25} />
            <CSButton onClick={buttonFunc}>{buttonText}</CSButton>
          </ModalContent2>
        </ModalContainer>
      )}
    </div>
  )
}
export default ModalScreen

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  box-sizing: border-box;
  margin: 25px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-height: 80vh;
  overflow: auto;
`

const ModalContent2 = styled.div`
  box-sizing: border-box;
  margin: 25px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  max-height: 80vh;
  overflow: auto;
`

const Text = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
`
const CSButton = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  height: 40px;
  line-height: 40px;
  width: 100%;
  background-color: #5b8def;
  border-radius: 5px;
  text-align: center;
`

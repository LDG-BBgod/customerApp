import styled from 'styled-components'
import { useSelector } from 'react-redux'

function Overlay({ children, onClose = () => {} }) {
  const { isMobile } = useSelector((state) => state.dealer)

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div>
      {isMobile ? (
        <ModalContainer onClick={handleOverlayClick}>
          <ModalContent>{children}</ModalContent>
        </ModalContainer>
      ) : (
        <ModalContainer onClick={handleOverlayClick}>
          <ModalContent2>{children}</ModalContent2>
        </ModalContainer>
      )}
    </div>
  )
}

export default Overlay

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

import styled from 'styled-components'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`

function Loading() {
  return (
    <ModalContainer>
      <img src="/img/loading.svg" alt="로딩" height={80} width={80} />
    </ModalContainer>
  )
}

export default Loading

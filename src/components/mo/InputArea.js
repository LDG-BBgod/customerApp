import { styled } from 'styled-components'
import Spacer from './Spacer'

const Box = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 72px;
  border: solid 0.5px #cacaca;
  border-radius: 10px;
`
const Text = styled.div`
  font-size: 12px;
`
const InputArea = ({ text, children }) => {
  return (
    <Box>
      <Text>{text}</Text>
      {children}
    </Box>
  )
}

export default InputArea

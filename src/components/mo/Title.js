import styled from 'styled-components'

const Text = styled.div`
  font-size: 14px;
  font-weight: bold;
`

const Title = ({ children }) => {
  return <Text>{children}</Text>
}
export default Title

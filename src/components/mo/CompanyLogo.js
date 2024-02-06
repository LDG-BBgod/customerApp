import styled from 'styled-components'

const Box = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`
const CompanyLogo = ({ src }) => {
  return (
    <Box>
      <img src={src} alt="logo" width={150} height={45} />
    </Box>
  )
}
export default CompanyLogo

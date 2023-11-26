import styled from 'styled-components'

import MainSection from '../../components/mo/MainSection'
import MobileHeader from '../../components/mo/MobileHeader'
import Spacer from '../../components/mo/Spacer'

const ErrorPage = () => {
  return (
    <Backgroud>
      <MainSection>
        <MobileHeader />
        <Spacer space={50} />
        <span
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          서비스 에러
        </span>
        <Spacer space={50} />
        <img
          src="/img/errorImg.svg"
          alt="errorImg"
          width={187}
          height={121}
          style={{ margin: '0 auto' }}
        />
        <Spacer space={50} />

        <CSText>이용에 불편을 드려 죄송합니다.</CSText>
        <Spacer space={15} />
        <CSText>'010-7770-2696'으로 연락주시면</CSText>
        <Spacer space={15} />
        <CSText>빠르게 해결해드리겠습니다.</CSText>
      </MainSection>
    </Backgroud>
  )
}

export default ErrorPage

const Backgroud = styled.div`
  background: #5b8def;
`
const CSText = styled.div`
  color: #fff;
  font-size: 16;
  font-weight: bold;
  text-align: center;
`

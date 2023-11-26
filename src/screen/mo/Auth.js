import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, batch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import { changeDType, changePID } from '../../actions/dealer'

import MainSection from '../../components/mo/MainSection'
import MobileHeader from '../../components/mo/MobileHeader'
import Spacer from '../../components/mo/Spacer'
import CompanyLogo from '../../components/mo/CompanyLogo'
import CustomCheckbox from '../../components/mo/CustomCheckbox'
import StepButton from '../../components/mo/StepButton'

const Auth = ({ func = null, backFunc = null, bogiFunc = null }) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div>
      <div style={{ textAlign: 'left' }} onClick={backFunc}>
        <img src="/img/back.svg" alt="exit" height={15} width={15} />
      </div>
      <Spacer space={20} />
      <Text>보험료 조회에만 이용됩니다.</Text>
      <Spacer space={30} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인정보 수집 전체동의'}
          isChecked={isChecked}
          onChange={setIsChecked}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={bogiFunc}
        >
          [보기]
        </div>
      </div>
      <Spacer space={12} />
      <StepButton
        buttonFunc={func}
        text={'본인 인증'}
        completed={isChecked}
      />
      <Spacer space={6} />
      <Text2>광고전화 절대 가지 않습니다.</Text2>
      <Spacer space={10} />
    </div>
  )
}

export default Auth

const Text = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  text-align: center;
`
const Text2 = styled.div`
  font-size: 10px;
  color: #ef5b5b;
  text-align: center;
`

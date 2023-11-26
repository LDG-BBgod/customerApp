// 모듈
import { styled } from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// 리덕스

// 컴포넌트
import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Title from '../../components/mo/Title'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'
import InputArea from '../../components/mo/InputArea'
import Overlay from '../../components/mo/Overlay'
import Loading from '../../components/mo/Loading'
import Auth from './Auth'
import AuthList from './AuthList'
// API
import GetUrlParams from '../../apis/GetUrlParams'

const CreatePid = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pid, setPid] = useState('')

  const handle6Button = async () => {
    await axios
      .post(process.env.REACT_APP_CREATEPID, { name, phone, type: '6' })
      .then((res) => {
        setPid(res.data)
        setIsComplete(true)
      })
  }
  const handle11Button = async () => {
    await axios
      .post(process.env.REACT_APP_CREATEPID, { name, phone, type: '11' })
      .then((res) => {
        setPid(res.data)
        setIsComplete(true)
      })
  }

  const handleSendLink = async () => {
    setIsLoading(true)
    await axios
      .post(process.env.REACT_APP_PIDSEND, { name, phone, pid })
      .then((res) => {
        alert('문자전송 완료~')
      })
    setIsLoading(false)
  }

  return (
    <MainSection>
      <Spacer space={30} />
      <InputArea text={'이름'}>
        <InputName
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          autoComplete="one-time-code"
        />
      </InputArea>
      <Spacer space={10} />
      <InputArea text={'전화번호'}>
        <InputName
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value)
          }}
          autoComplete="one-time-code"
        />
      </InputArea>
      <Spacer space={30} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridColumnGap: 10,
        }}
      >
        <StepButton
          buttonFunc={handle6Button}
          text={'6가지'}
          completed={true}
        />
        <StepButton
          buttonFunc={handle11Button}
          text={'11가지'}
          completed={true}
        />
      </div>
      <Spacer space={30} />
      {pid && (
        <div style={{ userSelect: 'text', wordBreak: 'break-all' }}>{pid}</div>
      )}
      <Spacer space={30} />
      <StepButton
        buttonFunc={handleSendLink}
        text={'링크 전달'}
        completed={isComplete}
      />
      {isLoading && <Loading />}
    </MainSection>
  )
}

export default CreatePid

const InputName = styled.input`
  padding-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
`

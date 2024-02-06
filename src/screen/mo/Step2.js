import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, batch } from 'react-redux'
import axios from 'axios'

import {
  setIsOpen,
  setContent,
  setButtonText,
  setButtonFunc,
  close,
} from '../../actions/modal'
import { setExistCar } from '../../actions/existCar'

import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Title from '../../components/mo/Title'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'
import InputArea from '../../components/mo/InputArea'
import Loading from '../../components/mo/Loading'

import getUrlParams from '../../apis/GetUrlParams'
import sendLog from '../../apis/sendLog'

const Step2 = ({ setStep }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [authNum, setAuthNum] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [countdown, setCountdown] = useState(179) // 3분 - 1초
  const [isLoading, setIsLoading] = useState(false)
  const { pid } = getUrlParams()

  const handleAuthNum = (e) => {
    const input = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (input.length <= 6) {
      setAuthNum(input)
      if (input.length === 6) {
        setIsComplete(true)
      }
    }
  }
  const handleButtonRequest = async () => {
    setIsLoading(true)
    const res = await axios
      .post(
        process.env.REACT_APP_RESENDAUTH,
        { pid },
        {
          timeout: 5000,
        },
      )
      .then((res) => {
        setIsLoading(false)
        if (!res.data.err) {
          setCountdown(179)
        } else {
          // [0007]
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(
              setContent(
                `인증번호 재전송 도중 오류가 발생하였습니다. \n처음부터 다시 진행해주세요. \n(베타서비스이기때문에 약간의 오류가 발생할 수 있습니다. 죄송합니다.)`,
              ),
            )
            dispatch(setButtonText('확 인'))
            dispatch(
              setButtonFunc(() => {
                dispatch(close())
                setStep(1)
              }),
            )
          })
        }
      })
      .catch((err) => {
        batch(() => {
          dispatch(setIsOpen(true))
          dispatch(
            setContent(
              `전산프로그램에 오류가 발생하였습니다. \n페이지를 새로고침해주세요. [2]`,
            ),
          )
          dispatch(setButtonText('확 인'))
          dispatch(
            setButtonFunc(() => {
              dispatch(close())
            }),
          )
        })
      })
    setIsLoading(false)
  }
  const handleButtonSubmit = async () => {
    setIsLoading(true)

    const body = {
      authNum,
      pid,
    }
    const res = await axios
      .post(process.env.REACT_APP_AUTHCHECK, body, {
        timeout: 10000,
      })
      .then((res) => {
        setIsLoading(false)
        if (!res.data.err) {
          if (res.data.msg.success) {
            dispatch(setExistCar(res.data.msg.data))
            setStep(3)
          } else {
            if (res.data.msg.text === '3년') {
              batch(() => {
                dispatch(setIsOpen(true))
                dispatch(
                  setContent(
                    `고객님은 현재 계약해지 시점과 신규 가입시점의 공백이 3년 이내의 계약자로서 카보를 통한 보험료 계산이 불가합니다. 회사를 통해 문의하여 주시기 바랍니다.`,
                  ),
                )
                dispatch(setButtonText('확 인'))
                dispatch(
                  setButtonFunc(() => {
                    dispatch(close())
                    setStep(1)
                  }),
                )
              })
            } else {
              batch(() => {
                dispatch(setIsOpen(true))
                dispatch(setContent(`인증번호 6자리를 다시 확인해주세요.`))
                dispatch(setButtonText('확 인'))
                dispatch(
                  setButtonFunc(() => {
                    dispatch(close())
                  }),
                )
              })
            }
          }
        } else {
          // [0003]
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(
              setContent(
                `인증번호 확인도중 오류가 발생했습니다. \n처음부터 다시 진행해주세요. \n(베타서비스이기때문에 약간의 오류가 발생할 수 있습니다. 죄송합니다.)`,
              ),
            )
            dispatch(setButtonText('확 인'))
            dispatch(
              setButtonFunc(() => {
                dispatch(close())
                setStep(1)
              }),
            )
          })
        }
      })
      .catch((err) => {
        batch(() => {
          dispatch(setIsOpen(true))
          dispatch(
            setContent(
              `전산프로그램에 오류가 발생하였습니다. \n페이지를 새로고침해주세요. [2]`,
            ),
          )
          dispatch(setButtonText('확 인'))
          dispatch(
            setButtonFunc(() => {
              dispatch(close())
            }),
          )
        })
      })
    setIsLoading(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    sendLog(pid, '스탭2 진입완료', 'log')
  }, [pid])

  return (
    <MainSection>
      <StepHeader src={'/img/step2.svg'} />
      <Spacer space={30} />
      <Title>고객님 핸드폰으로</Title>
      <Spacer space={5} />
      <Title>인증번호가 발송되었습니다.</Title>
      <Spacer space={30} />
      {countdown > 0 ? (
        <div style={{ color: '#CACACA', fontSize: 14, fontWeight: 'bold' }}>
          {Math.floor(countdown / 60)} : {countdown % 60}
        </div>
      ) : (
        <div style={{ color: '#CACACA', fontSize: 14, fontWeight: 'bold' }}>
          시간초과
        </div>
      )}
      <Spacer space={8} />
      <InputArea text={'인증번호'}>
        <InputAuth type="text" value={authNum} onChange={handleAuthNum} />
      </InputArea>
      <Spacer space={20} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.8fr 1fr',
          gridColumnGap: 10,
        }}
      >
        <StepButton
          style={{
            backgroundColor: '#CACACA',
          }}
          text={'재전송'}
          completed={false}
          nonCompletedButtonFunc={handleButtonRequest}
        />
        <StepButton
          buttonFunc={handleButtonSubmit}
          text={'확인'}
          completed={isComplete}
        />
      </div>
      <Spacer space={40} />
      {isLoading && <Loading />}
    </MainSection>
  )
}

export default Step2

const InputAuth = styled.input`
  padding-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
  letter-spacing: 2px;
`

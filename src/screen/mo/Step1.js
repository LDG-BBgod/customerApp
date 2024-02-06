import { styled } from 'styled-components'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { setPhone as setPhoneNum } from '../../actions/phone'
import { setJumin } from '../../actions/jumin'
import {
  changeCSName,
  changeFsn,
  changeBsn,
  changePhoneAuth,
} from '../../actions/customer'
import {
  setIsOpen,
  setContent,
  setButtonText,
  setButtonFunc,
  close,
} from '../../actions/modal'

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
import Text1 from '../text1'
import Text2 from '../text2'
import Text3 from '../text3'
import Text4 from '../text4'
import Text5 from '../text5'
import Text6 from '../text6'
import Text7 from '../text7'
import Text8 from '../text8'

import getUrlParams from '../../apis/GetUrlParams'
import sendLog from '../../apis/sendLog'

const Step1test = ({ setStep }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fsnInputRef = useRef(null)
  const bsnInputRef = useRef(null)
  const [isPageInit, setIsPageInit] = useState(false)
  const [name, setName] = useState('') //초기 ''
  const [fsn, setFsn] = useState('') //초기 ''
  const [bsn, setBsn] = useState('') //초기 ''
  const [telcom, setTelcom] = useState('SKT') //초기 'SKT'
  const [phone, setPhone] = useState('') //초기 ''
  const [isComplete, setIsComplete] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [isModalOpen3, setIsModalOpen3] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [comp, setComp] = useState(<div></div>)
  const { pid } = getUrlParams()

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleFsn = (e) => {
    const inputFsn = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (inputFsn.length <= 6) {
      setFsn(inputFsn)
    }
    if (inputFsn.length === 6) {
      bsnInputRef.current.focus()
    }
  }
  const handleBsn = (e) => {
    const inputBsn = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (inputBsn.length <= 7) {
      setBsn(inputBsn)
    }
  }
  const handleTelcom = (e) => {
    setTelcom(e.target.value)
  }
  const handlePhone = (e) => {
    const inputBsn = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (inputBsn.length <= 11) {
      setPhone(inputBsn)
    }
  }

  const handleButton = async () => {
    if (isPageInit) {
      setIsModalOpen(true)
    } else {
      batch(() => {
        dispatch(setIsOpen(true))
        dispatch(setContent(`세션준비중입니다. 잠시후 다시 시도해주세요.`))
        dispatch(setButtonText('확 인'))
        dispatch(
          setButtonFunc(() => {
            dispatch(close())
          }),
        )
      })
    }
  }
  const handleModalButton = async () => {
    setIsModalOpen(false)
    setIsLoading(true)
    const body = {
      name,
      fsn,
      bsn,
      telcom,
      phone,
      pid,
    }
    await axios
      .post(process.env.REACT_APP_PHONESUBMIT, body, {
        timeout: 10000,
      })
      .then((res) => {
        if (!res.data.err) {
          if (res.data.msg.success) {
            batch(() => {
              dispatch(setPhoneNum(phone))
              dispatch(setJumin(fsn))
              dispatch(changeCSName(name))
              dispatch(changeFsn(fsn))
              dispatch(changeBsn(bsn))
              dispatch(changePhoneAuth(phone))
            })

            setStep(2)
          } else {
            batch(() => {
              dispatch(setIsOpen(true))
              dispatch(
                setContent(`조회불가, 고객정보를 다시한번 확인해주세요.`),
              )
              dispatch(setButtonText('확 인'))
              dispatch(
                setButtonFunc(() => {
                  dispatch(close())
                }),
              )
            })
          }
        } else {
          // [0002]
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(
              setContent(
                `인증번호 요청에 실패하였습니다. \n페이지를 새로고침해주세요. \n(베타서비스이기때문에 약간의 오류가 발생할 수 있습니다. 죄송합니다.)`,
              ),
            )
            dispatch(setButtonText('확 인'))
            dispatch(
              setButtonFunc(() => {
                dispatch(close())
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
              `전산프로그램에 오류가 발생하였습니다. \n페이지를 새로고침해주세요. [1]`,
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
    const checkInput = () => {
      if (name && fsn && bsn && telcom && phone) {
        setIsComplete(true)
      } else {
        setIsComplete(false)
      }
    }
    checkInput()
  }, [name, fsn, bsn, telcom, phone])

  // 셧다운
  useEffect(() => {
    const shutDown = async () => {
      await axios
        .post(process.env.REACT_APP_SHUTDOWN, { pid })
        .catch((err) => {})
    }
    shutDown()
  }, [])

  // 페이지 인잇
  useEffect(() => {
    const initPage = async () => {
      setTimeout(async () => {
        await axios
          .post(
            process.env.REACT_APP_PAGEINIT,
            { pid },
            {
              timeout: 15000,
            },
          )
          .then((res) => {
            const isErr = res.data.err
            if (!isErr) {
              setIsPageInit(true)
            } else {
              // [0001]
              batch(() => {
                dispatch(setIsOpen(true))
                dispatch(
                  setContent(
                    `페이지 준비도중 오류가 발생하였습니다. \n페이지를 새로고침해주세요. \n(베타서비스이기때문에 약간의 오류가 발생할 수 있습니다. 죄송합니다.)`,
                  ),
                )
                dispatch(setButtonText('확 인'))
                dispatch(
                  setButtonFunc(() => {
                    dispatch(close())
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
                  `전산프로그램에 오류가 발생하였습니다. \n페이지를 새로고침해주세요. [1]`,
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
      }, 1000)
    }
    initPage()
  }, [])

  useEffect(() => {
    sendLog(pid, '스탭1 진입완료', 'log')
  }, [])

  return (
    <MainSection>
      <StepHeader src={'/img/step1.svg'} />
      <Spacer space={30} />
      <Title>보험료 비교를 위해 정보를 입력해주세요.</Title>
      <Spacer space={30} />

      <InputArea text={'고객(피보험자) 성함'}>
        <InputName
          type="text"
          value={name}
          onChange={handleName}
          autoComplete="one-time-code"
        />
      </InputArea>
      <Spacer space={16} />

      <InputArea text={'고객(피보험자) 주민번호'}>
        <SnBox>
          <InputFsn
            type="text"
            value={fsn}
            onChange={handleFsn}
            style={{ flexBasis: '50%' }}
            autoComplete="one-time-code"
            ref={fsnInputRef}
          />
          <div
            style={{
              marginTop: 15,
              flexBasis: '10px',
              textAlign: 'center',
              height: 2,
              backgroundColor: '#9F9F9F',
            }}
          ></div>
          <InputBsn
            type="password"
            value={bsn}
            onChange={handleBsn}
            style={{ flexBasis: '50%' }}
            autoComplete="one-time-code"
            ref={bsnInputRef}
          />
        </SnBox>
      </InputArea>
      <Spacer space={16} />

      <div style={{ display: 'grid', gridTemplateColumns: '4fr 10px 6fr' }}>
        <InputArea text={'통신사'}>
          <InputTelcom onChange={handleTelcom}>
            <option>SKT</option>
            <option>KT</option>
            <option>LG</option>
            <option>알뜰SKT</option>
            <option>알뜰KT</option>
            <option>알뜰LG</option>
          </InputTelcom>
        </InputArea>
        <div></div>
        <InputArea text={'고객전화번호'}>
          <InputPhone
            type="text"
            value={phone}
            onChange={handlePhone}
            autoComplete="one-time-code"
          />
        </InputArea>
      </div>
      <Spacer space={40} />
      <StepButton
        buttonFunc={handleButton}
        text={'고객에게 정보 동의 요청'}
        completed={isComplete}
      />
      <Spacer space={10} />
      <div style={{ backgroundColor: '#EDEDEB', padding: 15 }}>
        <div style={{ fontSize: 14, color: '#EC4E00', fontWeight: 'bold' }}>
          안심하고 이용하세요!
        </div>
        <Spacer space={7} />
        <div style={{ fontSize: 12, lineHeight: 1.3 }}>
          관련 법률 및 규정에 따라 보험료 계산에만 정보가 활용됩니다.
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.3 }}>
          광고, 전화영업에 활용되지 않습니다.
        </div>
      </div>
      <Spacer space={40} />
      {isLoading && <Loading />}
      {isModalOpen && (
        <Overlay onClose={() => setIsModalOpen(false)}>
          <Auth
            func={handleModalButton}
            backFunc={() => {
              setIsModalOpen(false)
            }}
            bogiFunc={() => {
              setIsModalOpen(false)
              setIsModalOpen2(true)
            }}
          />
        </Overlay>
      )}
      {isModalOpen2 && (
        <Overlay onClose={() => setIsModalOpen2(false)}>
          <AuthList
            backFunc={() => {
              setIsModalOpen(true)
              setIsModalOpen2(false)
            }}
            bogiFunc1={() => {
              setIsModalOpen2(false)
              setIsModalOpen3(true)
              setComp(<Text1 />)
            }}
            bogiFunc2={() => {
              setIsModalOpen2(false)
              setIsModalOpen3(true)
              setComp(<Text2 />)
            }}
            bogiFunc3={() => {
              setIsModalOpen2(false)
              setIsModalOpen3(true)
              setComp(<Text3 />)
            }}
            bogiFunc4={() => {
              setIsModalOpen2(false)
              setIsModalOpen3(true)
              setComp(<Text4 />)
            }}
            bogiFunc5={() => {
              setIsModalOpen2(false)
              setIsModalOpen3(true)
              setComp(<Text5 />)
            }}
            bogiFunc6={() => {
              setIsModalOpen2(false)
              setIsModalOpen3(true)
              setComp(<Text6 />)
            }}
            bogiFunc7={() => {
              setIsModalOpen2(false)
              setIsModalOpen3(true)
              setComp(<Text7 />)
            }}
            bogiFunc8={() => {
              setIsModalOpen2(false)
              setIsModalOpen3(true)
              setComp(<Text8 />)
            }}
          />
        </Overlay>
      )}
      {isModalOpen3 && (
        <Overlay onClose={() => setIsModalOpen3(false)}>
          <div
            style={{ textAlign: 'left' }}
            onClick={() => {
              setIsModalOpen2(true)
              setIsModalOpen3(false)
            }}
          >
            <img src="/img/back.svg" alt="exit" height={20} width={20} />
            {comp}
          </div>
        </Overlay>
      )}
    </MainSection>
  )
}

const SnBox = styled.div`
  display: flex;
  align-items: center;
`
const InputName = styled.input`
  padding-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
`
const InputFsn = styled.input`
  padding-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
  letter-spacing: 2px;
`
const InputBsn = styled.input`
  padding: 15px 10% 0 10%;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #9f9f9f;
  letter-spacing: 4px;
`
const InputTelcom = styled.select`
  background-color: #fff;
  margin-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  color: #9f9f9f;
`
const InputPhone = styled.input`
  padding-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
  letter-spacing: 2px;
`
export default Step1test

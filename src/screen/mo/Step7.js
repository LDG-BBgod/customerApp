import { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import axios from 'axios'

import { setResult } from '../../actions/result'
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
import Loading from '../../components/mo/Loading'
import Overlay from '../../components/mo/Overlay'
import SelectArea from '../../components/mo/SelectArea'

import getUrlParams from '../../apis/GetUrlParams'
import sendLog from '../../apis/sendLog'

const Step7 = ({ setStep }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { jumin } = useSelector((state) => state.jumin)
  const { csname, phoneAuth, fsn, bsn } = useSelector((state) => state.customer)

  const [isComplete, setIsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClickedPrev, setIsClickedPrev] = useState(false)
  const [isClickedNext, setIsClickedNext] = useState(false)
  const [range, setRange] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [minBirth, setMinBrith] = useState('')
  const [secondBirth, setSecondBirth] = useState('')
  const [level, setLevel] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [option1, setOption1] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [option2, setOption2] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [option3, setOption3] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [option4, setOption4] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [option5, setOption5] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [option6, setOption6] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [option7, setOption7] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [option8, setOption8] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const { pid } = getUrlParams()

  const handleSelectRange = (op) => {
    return [
      { nm: '피보험자 1인', cd: 'famradio01' },
      { nm: '부부한정', cd: 'famradio04' },
      { nm: '피보험자 1인 & 지정 1인', cd: 'famradio02' },
      { nm: '가족한정(형제자매 제외)', cd: 'famradio05' },
      { nm: '누구나', cd: 'famradio03' },
      { nm: '가족 & 형제자매', cd: 'famradio06' },
    ]
  }
  const handleMinBirth = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (inputValue.length <= 8) {
      setMinBrith(inputValue)
    }
  }
  const handleSecondBirth = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (inputValue.length <= 8) {
      setSecondBirth(inputValue)
    }
  }
  const handleSelectLevel = (op) => {
    return [
      { nm: '의무 보험', cd: 'level1' },
      { nm: '자차없는 종합보험(보통 보장)', cd: 'level2m' },
      { nm: '자차없는 종합보험(높은 보장)', cd: 'level2h' },
      { nm: '자차포함 종합보험(보통 보장)', cd: 'level3m' },
      { nm: '자차포함 종합보험(높은 보장)', cd: 'level3h' },
      { nm: '직접 입력', cd: 'level4' },
    ]
  }
  const handleOption1 = (op) => {
    return [{ nm: '가입 (의무)', cd: 'yes' }]
  }
  const handleOption2 = (op) => {
    return [
      { nm: '가입', cd: 'rad33' },
      { nm: '미가입', cd: 'rad34' },
    ]
  }
  const handleOption3 = (op) => {
    return [
      { nm: '2천만원', cd: 'rad35' },
      { nm: '3천만원', cd: 'rad36' },
      { nm: '5천만원', cd: 'rad37' },
      { nm: '7천만원', cd: 'rad38' },
      { nm: '1억원', cd: 'rad39' },
      { nm: '2억원', cd: 'rad40' },
      { nm: '3억원', cd: 'rad41' },
      { nm: '5억원', cd: 'rad42' },
      { nm: '10억원', cd: 'rad43' },
    ]
  }
  const handleOption4 = (op) => {
    return [
      { nm: '자기신체손해 1500만 / 1500만', cd: 'rad43' },
      { nm: '자기신체손해 3000만 / 1500만', cd: 'rad44' },
      { nm: '자기신체손해 5000만 / 1500만', cd: 'rad45' },
      { nm: '자기신체손해 1억 / 1500만', cd: 'rad47' },
      { nm: '자동차상해 1억 / 2000만', cd: 'rad66' },
      { nm: '자동차상해 1억 / 3000만', cd: 'rad67' },
      { nm: '자동차상해 2억 / 2000만', cd: 'rad68' },
      { nm: '자동차상해 2억 / 3000만', cd: 'rad69' },
      { nm: '자동차상해 2억 / 5000만', cd: 'rad70' },
      { nm: '자동차상해 3억 / 3000만', cd: 'rad71' },
      { nm: '자동차상해 3억 / 5000만', cd: 'rad72' },
      { nm: '미가입', cd: 'rad99' },
    ]
  }
  const handleOption5 = (op) => {
    return [
      { nm: '가입(2억)', cd: 'rad50' },
      { nm: '미가입', cd: 'rad51' },
    ]
  }
  const handleOption6 = (op) => {
    return [
      { nm: '가입', cd: 'rad48' },
      { nm: '미가입', cd: 'rad49' },
    ]
  }
  const handleOption7 = (op) => {
    return [
      { nm: '가입', cd: 'rad64' },
      { nm: '미가입', cd: 'rad65' },
    ]
  }
  const handleOption8 = (op) => {
    return [
      { nm: '50만원', cd: 'rad60' },
      { nm: '100만원', cd: 'rad61' },
      { nm: '150만원', cd: 'rad62' },
      { nm: '200만원', cd: 'rad63' },
    ]
  }

  const secondBirthComp = () => {
    if (range.id === 'famradio04') {
      return (
        <div>
          <Text>배우자 (생년월일 8자리)</Text>
          <Spacer space={8} />
          <Box>
            <InputFsn
              type="text"
              value={secondBirth}
              onChange={handleSecondBirth}
              placeholder="생년월일8자리 ex)19960101"
            />
          </Box>
          <Spacer space={20} />
        </div>
      )
    } else if (range.id === 'famradio02') {
      return (
        <div>
          <Text>지정1인 (생년월일 8자리)</Text>
          <Spacer space={8} />
          <Box>
            <InputFsn
              type="text"
              value={secondBirth}
              onChange={handleSecondBirth}
              placeholder="생년월일8자리 ex)19960101"
            />
          </Box>
          <Spacer space={20} />
        </div>
      )
    } else {
      return null
    }
  }

  useEffect(() => {
    const handleButtonSubmit = async () => {
      const regex = /^(19|20)\d\d(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
      const minBirthCheck = regex.test(minBirth)
      let secondBirthCheck = false
      if (range.id === 'famradio04' || range.id === 'famradio02') {
        secondBirthCheck = regex.test(secondBirth)
      } else {
        secondBirthCheck = true
      }
      if (minBirthCheck && secondBirthCheck) {
        const body = {
          range: range.id,
          minBirth: minBirth,
          secondBirth: secondBirth,
          level: level.id,
          option1: option1.id,
          option2: option2.id,
          option3: option3.id,
          option4: option4.id,
          option5: option5.id,
          option6: option6.id,
          option7: option7.id,
          option8: option8.id,
          pid,
        }

        await axios
          .post(process.env.REACT_APP_EXSITGETRESULT, body, {
            timeout: 60000,
          })
          .then((res) => {
            setIsModalOpen(false)
            if (!res.data.err) {
              if (res.data.msg.success) {
                dispatch(setResult(res.data.msg.text))
                sendLog(
                  pid,
                  {
                    csname,
                    phoneAuth,
                    fsn,
                    bsn,
                    list: res.data.msg.text,
                    carValue1:'기존차량',
                    carValue2:'기존차량',
                    carValue3:'기존차량',
                    carValue4:'기존차량',
                    carValue5:'기존차량',
                    range: range.text,
                    minBirth,
                    secondBirth,
                    level: level.text,
                    option1: option1.text,
                    option2: option2.text,
                    option3: option3.text,
                    option4: option4.text,
                    option5: option5.text,
                    option6: option6.text,
                    option7: option7.text,
                    option8: option8.text,
                  },
                  'customer',
                )
                setStep(6)
              } else {
                batch(() => {
                  dispatch(setIsOpen(true))
                  dispatch(setContent(`${res.data.msg.text}`))
                  dispatch(setButtonText('확 인'))
                  dispatch(
                    setButtonFunc(() => {
                      dispatch(close())
                    }),
                  )
                })
              }
            } else {
              // [0005]
              batch(() => {
                dispatch(setIsOpen(true))
                dispatch(
                  setContent(
                    `보험가입정보 선택도중 오류가 발생하였습니다. \n처음부터 다시 진행해주세요. \n(베타서비스이기때문에 약간의 오류가 발생할 수 있습니다. 죄송합니다.)`,
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
                  `전산프로그램에 오류가 발생하였습니다. \n페이지를 새로고침해주세요.[4]`,
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
      } else {
        setIsClickedNext(false)
      }
    }

    if (isClickedNext) {
      if (isComplete) {
        setIsModalOpen(true)
        handleButtonSubmit()
      } else {
        setIsClickedNext(false)
        if (minBirth.length === 6 || secondBirth.length === 6) {
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(setContent(`생년월일을 8자리 입력해주세요.\n ex)19960101`))
            dispatch(setButtonText('확 인'))
            dispatch(
              setButtonFunc(() => {
                dispatch(close())
              }),
            )
          })
        } else {
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(
              setContent(
                `운전자범위, 최저 연령자 "생년월일 8자리" , 보장 정도를 모두 선택해주세요.`,
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
      }
    } else {
      setIsModalOpen(false)
    }
  }, [
    isClickedNext,
    setStep,
    range,
    minBirth,
    secondBirth,
    level,
    option1,
    option2,
    option3,
    option4,
    option5,
    option6,
    option7,
    option8,
    dispatch,
    navigate,
  ])

  useEffect(() => {
    const regex = /^(19|20)\d\d(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
    const minBirthCheck = regex.test(minBirth) ? true : false
    let secondBirthCheck = true
    if (range.id === 'famradio04' || range.id === 'famradio02') {
      secondBirthCheck = regex.test(secondBirth) ? true : false
    }

    let levelCehck = level.state

    if (level.id === 'level4') {
      levelCehck =
        option1.state &&
        option2.state &&
        option3.state &&
        option4.state &&
        option5.state &&
        option6.state &&
        option7.state &&
        option8.state
    }
    if (range.state && minBirthCheck && secondBirthCheck && levelCehck) {
      setIsComplete(true)
    } else {
      setIsComplete(false)
    }
  }, [
    range,
    minBirth,
    secondBirth,
    level,
    option1,
    option2,
    option3,
    option4,
    option5,
    option6,
    option7,
    option8,
  ])

  useEffect(() => {
    if (range.id === 'famradio01') {
      setMinBrith(jumin)
    } else {
      setMinBrith('')
    }
  }, [range, jumin])

  useEffect(() => {
    sendLog(pid, '스탭5 진입완료', 'log')
  }, [pid])

  return (
    <MainSection>
      <StepHeader src={'/img/step4.svg'} />
      <Spacer space={30} />
      <Title>조건을 설정하면 보험료 확인이 가능해요.</Title>
      <Spacer space={30} />

      <SelectArea
        text={'운전자범위'}
        selectFunc={handleSelectRange}
        optionFunc={setRange}
        boxText={range.text}
        posible={true}
      />
      <Spacer space={20} />

      <Text>
        최저 연령자 <CSSpan>(생년월일 8자리)</CSSpan>
      </Text>
      <Spacer space={8} />
      <Box>
        <InputFsn
          type="text"
          value={minBirth}
          onChange={handleMinBirth}
          placeholder="생년월일8자리 ex)19960101"
        />
      </Box>
      <Spacer space={20} />

      {secondBirthComp()}

      <SelectArea
        text={'보장 정도'}
        selectFunc={handleSelectLevel}
        optionFunc={setLevel}
        boxText={level.text}
        posible={true}
      />
      <Spacer space={20} />

      {level.id !== 'level4' ? (
        <div></div>
      ) : (
        <AddArea>
          <SelectArea
            text={'대인 1'}
            selectFunc={handleOption1}
            optionFunc={setOption1}
            boxText={option1.text}
            posible={true}
          />
          <Spacer space={20} />

          <SelectArea
            text={'대인 2'}
            selectFunc={handleOption2}
            optionFunc={setOption2}
            boxText={option2.text}
            posible={true}
          />
          <Spacer space={20} />

          <SelectArea
            text={'대물배상'}
            selectFunc={handleOption3}
            optionFunc={setOption3}
            boxText={option3.text}
            posible={true}
          />
          <Spacer space={20} />

          <SelectArea
            text={'자기신체손해'}
            selectFunc={handleOption4}
            optionFunc={setOption4}
            boxText={option4.text}
            posible={true}
          />
          <Spacer space={20} />

          <SelectArea
            text={'무보험차상해'}
            selectFunc={handleOption5}
            optionFunc={setOption5}
            boxText={option5.text}
            posible={true}
          />
          <Spacer space={20} />

          <SelectArea
            text={'자기차량손해'}
            selectFunc={handleOption6}
            optionFunc={setOption6}
            boxText={option6.text}
            posible={true}
          />
          <Spacer space={20} />

          <SelectArea
            text={'긴급출동서비스'}
            selectFunc={handleOption7}
            optionFunc={setOption7}
            boxText={option7.text}
            posible={true}
          />
          <Spacer space={20} />

          <SelectArea
            text={'물적할증금액'}
            selectFunc={handleOption8}
            optionFunc={setOption8}
            boxText={option8.text}
            posible={true}
          />
          <Spacer space={20} />
        </AddArea>
      )}

      <Spacer space={20} />
      <StepButton
        buttonFunc={() => {
          setIsClickedNext(true)
        }}
        text={'예상 보험료 확인'}
        completed={true}
      />
      <Spacer space={40} />
      {isModalOpen && (
        <Overlay>
          <div style={{ fontSize: 14, textAlign: 'center' }}>
            보험료 계산중입니다
          </div>
          <Spacer space={5} />
          <div style={{ fontSize: 14, textAlign: 'center' }}>
            잠시만 기다려주세요
          </div>
          <Spacer space={20} />
          <div style={{ textAlign: 'center' }}>
            <img src="/img/loading.svg" alt="로딩" height={60} width={60} />
          </div>
          <Spacer space={20} />
          <div style={{ fontSize: 10, textAlign: 'center', color: '#9F9F9F' }}>
            (30초 정도 소요됩니다)
          </div>
        </Overlay>
      )}
      {isLoading && <Loading />}
    </MainSection>
  )
}

export default Step7

const Text = styled.div`
  font-size: 12px;
`

const Box = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: solid 0.5px #cacaca;
  width: 100%;
  min-height: 40px;
  font-size: 14px;
  line-height: 18px;
  border-radius: 10px;
  text-align: center;
  color: #9f9f9f;
`

const InputFsn = styled.input`
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  color: #9f9f9f;
  letter-spacing: 2px;
  text-align: center;
`

const AddArea = styled.div`
  background-color: #7ba6f9;
  padding: 20px 10px;
  border-radius: 5px;
`
const CSSpan = styled.span`
  font-size: 12px;
  color: #ef5b5b;
`

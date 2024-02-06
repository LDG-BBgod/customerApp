import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
import RadioButton from '../../components/mo/RadioButton'
import CompanyArea from '../../components/mo/CompanyArea'
import Loading from '../../components/mo/Loading'
import Overlay from '../../components/mo/Overlay'
import StepButton from '../../components/mo/StepButton'
import InputArea from '../../components/mo/InputArea'
import CompanyLogo from '../../components/mo/CompanyLogo'

import getUrlParams from '../../apis/GetUrlParams'
import sendLog from '../../apis/sendLog'

const Step6 = ({ setStep }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const phoneNum = useSelector((state) => state.phone.phone)
  const { isMobile } = useSelector((state) => state.dealer)
  const { csname, phoneAuth, fsn, bsn } = useSelector((state) => state.customer)

  const { result } = useSelector((state) => state.resultData)
  const [resData, setResData] = useState([])
  const [callData, setCallData] = useState([])
  const [isOnline, setIsOnline] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isRadioSelected, setIsRadioSelected] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [resTelNum, setResTelNum] = useState('')
  const [phone, setPhone] = useState(phoneNum)
  const [companyIsSelected, setCompanyIsSelected] = useState({
    list0: true,
    list1: false,
    list2: false,
    list3: false,
    list4: false,
    list5: false,
    list6: false,
    list7: false,
    list8: false,
    list9: false,
    list10: false,
  })
  const { pid, dtype } = getUrlParams()
  function countTrueValues(obj) {
    let count = 0
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === true) {
        count++
      }
    }
    return count
  }

  const handlePhone = (event) => {
    setPhone(event.target.value)
  }
  const handleOpenModal = () => {
    if (countTrueValues(companyIsSelected) !== 0) {
      setIsModalOpen(true)
    } else {
      batch(() => {
        dispatch(setIsOpen(true))
        dispatch(setContent(`1개 이상 선택해주세요.`))
        dispatch(setButtonText('확 인'))
        dispatch(
          setButtonFunc(() => {
            dispatch(close())
          }),
        )
      })
    }
  }
  const handelSendSMS = async () => {
    const regex = /^(010|02)[-\s]?\d{3,4}[-\s]?\d{4}$/
    if (regex.test(phone)) {
      setIsLoading(true)
      const selectedListKeys = Object.keys(companyIsSelected).filter(
        (key) => companyIsSelected[key],
      )
      const selectedList = selectedListKeys
      const body = {
        phone,
        resData,
        selectedList,
        isOnline,
      }
      // 로그전달
      const indexs = selectedList.map((item) => {
        return parseInt(item.match(/\d+/)[0], 10)
      })
      const listsIndex = indexs.map((index) => {
        return resData[index]
      })
      const ids = listsIndex.map((item) => item.name)
      sendLog(
        pid,
        {
          csname,
          phoneSend: phone,
          insuType: isOnline,
          insuList: ids,
        },
        'sendContent',
      )
      // 로그전달

      await axios
        .post(process.env.REACT_APP_SENDSMS, body, {
          timeout: 10000,
        })
        .then((res) => {
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(setContent(`문자 전송이 완료되었습니다.`))
            dispatch(setButtonText('확 인'))
            dispatch(
              setButtonFunc(() => {
                dispatch(close())
              }),
            )
          })
        })
        .catch((err) => {
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(setContent(`전산프로그램에 오류가 발생하였습니다. \n페이지를 새로고침해주세요.[5]`))
            dispatch(setButtonText('확 인'))
            dispatch(
              setButtonFunc(() => {
                dispatch(close())
              }),
            )
          })
        })
      setIsLoading(false)
      setIsModalOpen(false)
    } else {
      batch(() => {
        dispatch(setIsOpen(true))
        dispatch(setContent(`올바른 전화번호를 입력해 주세요.`))
        dispatch(setButtonText('확 인'))
        dispatch(
          setButtonFunc(() => {
            dispatch(close())
          }),
        )
      })
    }
  }

  const handelGoLink = async () => {
    if (countTrueValues(companyIsSelected) === 1) {
      setIsLoading(true)
      const selectedListKeys = Object.keys(companyIsSelected).filter(
        (key) => companyIsSelected[key],
      )
      const selectedList = selectedListKeys
      const body = {
        phone,
        resData,
        selectedList,
        isOnline,
        isMobile,
      }

      await axios
        .post(process.env.REACT_APP_SENDLINK, body, {
          timeout: 10000,
        })
        .then((res) => {
          if (isOnline) {
            window.location.href = res.data
          } else {
            if (isMobile) {
              window.location.href = `tel:${res.data}`
            } else {
              setResTelNum(res.data)
              setIsModalOpen2(true)
            }
          }
        })
        .catch((err) => {
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(setContent(`전산프로그램에 오류가 발생하였습니다. \n페이지를 새로고침해주세요.[5]`))
            dispatch(setButtonText('확 인'))
            dispatch(
              setButtonFunc(() => {
                dispatch(close())
              }),
            )
          })
        })
      setIsLoading(false)
    } else {
      batch(() => {
        dispatch(setIsOpen(true))
        dispatch(setContent(`1개만 선택해주세요.`))
        dispatch(setButtonText('확 인'))
        dispatch(
          setButtonFunc(() => {
            dispatch(close())
          }),
        )
      })
    }
  }

  useEffect(() => {
    const makeCallData = (value) => {
      const newData = value.map((item) => {
        if (item.money === '조회불가') {
          return { ...item }
        }
        const numericValue = parseFloat(item.money.replace(/,/g, '')) * 1.05
        const roundedValue = Math.floor(numericValue)
        const formattedValue = roundedValue.toLocaleString()
        return { ...item, money: formattedValue }
      })
      return newData
    }
    if (dtype === 'sixtype') {
      let cutData = result
      cutData = cutData.filter((item) => {
        return (
          item.name !== 'INSU0' &&
          item.name !== 'INSU1' &&
          item.name !== 'INSU3' &&
          item.name !== 'INSU4' &&
          item.name !== 'INSU9'
        )
      })
      for (let i = 0; i < 6; i += 1) {
        cutData[i].rank = i + 1
      }
      setResData(cutData)
      setCallData(makeCallData(cutData))
    } else {
      setResData(result)
      setCallData(makeCallData(result))
    }
  }, [dtype, result])

  useEffect(() => {
    sendLog(pid, '스탭6 진입완료', 'log')
  }, [])

  return (
    <MainSection>
      <StepHeader src={'/img/step5.svg'} />
      <Spacer space={30} />
      <Title>다이렉트 예상 보험료입니다.</Title>
      <Spacer space={6} />
      <SubText>실제 보험료는 예상 보험료와 다를 수 있습니다.</SubText>
      <Spacer space={30} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <RadioButton
          selected={isRadioSelected}
          text={'온라인 상품'}
          nonSlectedButtonFunc={() => {
            setIsRadioSelected(!isRadioSelected)
            setIsOnline(true)
          }}
        />
        <Spacer horizontal={false} space={15} />
        <RadioButton
          selected={!isRadioSelected}
          text={'전화 상품'}
          nonSlectedButtonFunc={() => {
            setIsRadioSelected(!isRadioSelected)
            setIsOnline(false)
          }}
        />
      </div>
      <Spacer space={15} />
      {isOnline ? (
        <div>
          {resData.map((item, index) => (
            <div key={index}>
              <CompanyArea
                data={item}
                selected={companyIsSelected[`list${index}`]}
                func={() => {
                  setCompanyIsSelected({
                    ...companyIsSelected,
                    [`list${index}`]: !companyIsSelected[`list${index}`],
                  })
                }}
              />
              <Spacer space={10} />
            </div>
          ))}
          <Spacer space={20} />
          <InfoText>보험사 선택후 고객님에게 문자로 안내하세요.</InfoText>
          <Spacer space={5} />
          <StepButton
            buttonFunc={() => {
              handelGoLink()
            }}
            text={'가입 사이트로 이동'}
            completed={true}
            backgroundColor="#5CDAA7"
          />
        </div>
      ) : (
        <div>
          {callData.map((item, index) => (
            <div key={index}>
              <CompanyArea
                data={item}
                selected={companyIsSelected[`list${index}`]}
                func={() => {
                  setCompanyIsSelected({
                    ...companyIsSelected,
                    [`list${index}`]: !companyIsSelected[`list${index}`],
                  })
                }}
              />
              <Spacer space={10} />
            </div>
          ))}
          <Spacer space={20} />
          <InfoText>보험사 선택후 고객님에게 문자로 안내하세요.</InfoText>
          <Spacer space={5} />
          <StepButton
            buttonFunc={() => {
              handelGoLink()
            }}
            text={'바로 전화하기'}
            completed={true}
            backgroundColor="#5CDAA7"
          />
          <Spacer space={15} />
          <BottomText>
            전화 상품은 온라인 상품에 비해 가격이 높습니다.
          </BottomText>
        </div>
      )}
      <Spacer space={50} />
      {isModalOpen && (
        <Overlay onClose={() => setIsModalOpen(false)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ModalText>전달받으실분의 전화번호를 입력해주세요</ModalText>
            <Spacer space={10} />
            <InputArea text={'전화번호'}>
              <InputPhone
                type="text"
                maxLength={11}
                value={phone}
                onChange={handlePhone}
              />
            </InputArea>
            <Spacer space={10} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '0.4fr 1fr',
                gridColumnGap: 10,
              }}
            >
              <StepButton
                nonCompletedButtonFunc={() => {
                  setIsModalOpen(false)
                }}
                text={'닫 기'}
                completed={false}
              />
              <StepButton
                buttonFunc={() => {
                  handelSendSMS()
                }}
                text={'전 송'}
                completed={true}
              />
            </div>
          </div>
        </Overlay>
      )}
      {isModalOpen2 && (
        <Overlay onClose={() => setIsModalOpen2(false)}>
          <div
            style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}
          >
            {resTelNum}
          </div>
          <Spacer space={20} />
          <StepButton
            text={'닫 기'}
            completed={true}
            buttonFunc={() => setIsModalOpen2(false)}
          />
        </Overlay>
      )}
      {isLoading && <Loading />}
    </MainSection>
  )
}

export default Step6

const SubText = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: #ef5b5b;
`

const InfoText = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: #000;
  text-align: center;
`
const ModalText = styled.div`
  font-size: 12px;
  color: #000;
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
const BottomText = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: #ef5b5b;
  text-align: center;
`
const SubTitle = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: bold;

  color: #9f9f9f;
`

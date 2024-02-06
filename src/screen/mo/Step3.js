import { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import axios from 'axios'

import { carSeleting, carSeleted } from '../../actions/carSelectComplete'
import {
  setIsOpen,
  setContent,
  setButtonText,
  setButtonFunc,
  close,
} from '../../actions/modal'
import {
  changeCarValue1,
  changeCarValue2,
  changeCarValue3,
  changeCarValue4,
  changeCarValue5,
} from '../../actions/carInfo'

import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Title from '../../components/mo/Title'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'
import Loading from '../../components/mo/Loading'
import SelectArea from '../../components/mo/SelectArea'

import getUrlParams from '../../apis/GetUrlParams'
import sendLog from '../../apis/sendLog'

const Step3 = ({ setStep }) => {
  const dispatch = useDispatch()
  const { pid } = getUrlParams()
  const { existCarArr } = useSelector((state) => state.existCar)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null)

  const handleButtonExist = async () => {
    const body = {
      selectedCar,
      pid,
    }
    setIsLoading(true)
    await axios
      .post(process.env.REACT_APP_EXISTCAR, body, { timeout: 15000 })
      .then((res) => {
        setIsLoading(false)
        if(!res.data.err) {
          setStep(7)
        } else {
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(
              setContent(
                `차량 선택도중 오류가 발생했습니다. \n처음부터 다시 진행해주세요. \n(베타서비스이기때문에 약간의 오류가 발생할 수 있습니다. 죄송합니다.)`,
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
        setIsLoading(false)
        console.error(err)
      })
  }
  const handleButtonNew = () => {
    setStep(4)
  }

  useEffect(() => {
    sendLog(pid, '스탭3 진입완료', 'log')
  }, [pid])

  return (
    <MainSection>
      <StepHeader src={'/img/step3.svg'} />
      <Spacer space={30} />
      <Title>갱신계약</Title>
      <Spacer space={10} />
      <ExplainText>1개월내에 만기 예정인 자동차</ExplainText>
      {existCarArr.length > 0 ? (
        <>
          {existCarArr.map((value, index) => {
            const isSelected = index === selectedCar
            return (
              <div key={`car-${index}`}>
                <Spacer space={20} />
                <div
                  onClick={() => {
                    setSelectedCar(value.index)
                  }}
                  style={{
                    border: isSelected
                      ? 'solid 1px #5B8DEF'
                      : 'solid 1px #cacaca',
                    backgroundColor: isSelected ? '#DBE9FF' : '#fff',
                    height: 37,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#cacaca',
                    borderRadius: 10,
                  }}
                >{`${value.carNum} ${value.endDate}`}</div>
              </div>
            )
          })}
        </>
      ) : (
        <>
          <div>
            <Spacer space={20} />
            <div
              style={{
                border: 'solid 1px #cacaca',
                height: 37,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cacaca',
                borderRadius: 10,
              }}
            >
              조회된 데이터가 없습니다.
            </div>
          </div>
        </>
      )}
      <Spacer space={20} />
      <StepButton
        buttonFunc={handleButtonExist}
        text={'선택 차량 비교하기'}
        completed={selectedCar === null ? false : true}
      />
      <Spacer space={70} />
      <Title>신규계약</Title>
      <Spacer space={10} />
      <ExplainText>자동차를 새로 구입했거나 구입예정인 자동차</ExplainText>
      <Spacer space={20} />
      <StepButton
        buttonFunc={handleButtonNew}
        text={'신규 차량 비교하기'}
        completed={true}
      />
      {isLoading && <Loading />}
    </MainSection>
  )
}

export default Step3

const ExplainText = styled.div`
  font-size: 14px;
  color: #cacaca;
`

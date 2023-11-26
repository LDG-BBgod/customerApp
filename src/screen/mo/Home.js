// 모듈
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, batch } from 'react-redux'
import axios from 'axios'
// 리덕스
import { changeIsLogin } from '../../actions/dealer'
import {
  setIsOpen,
  setContent,
  setButtonText,
  setButtonFunc,
  close,
} from '../../actions/modal'
// 컴포넌트
import MainSection from '../../components/mo/MainSection'
import MobileHeader from '../../components/mo/MobileHeader'
import Spacer from '../../components/mo/Spacer'
import CompanyLogo from '../../components/mo/CompanyLogo'
import AppDownload from '../../components/mo/AppDownload'
import Loading from '../../components/mo/Loading'
import StepButton from '../../components/mo/StepButton'
import Overlay from '../../components/mo/Overlay'
// API
import getUrlParams from '../../apis/GetUrlParams'
import sendLog from '../../apis/sendLog'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.dealer)

  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAndroid, setIsAndroid] = useState(true)
  const { dtype, pid } = getUrlParams()

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleButton = async () => {
    setIsLoading(true)
    const res = await axios
      .post(
        process.env.REACT_APP_CSPWCHECK,
        {
          value,
        },
        {
          timeout: 10000,
        },
      )
      .then((res) => {
        if (res.data) {
          localStorage.setItem('isLogin', 'true')
          sendLog(pid, '로그인', 'log')
          navigate(`/mo/compare?dtype=${dtype}&pid=${pid}`)
        } else {
          batch(() => {
            dispatch(setIsOpen(true))
            dispatch(setContent('잘못된 비밀번호입니다.'))
            dispatch(setButtonText('확 인'))
            dispatch(
              setButtonFunc(() => {
                dispatch(close())
              }),
            )
          })
        }
      })
      .catch((res) => {
        batch(() => {
          dispatch(setIsOpen(true))
          dispatch(
            setContent(
              `전산프로그램에 오류가 발생하였습니다. \n페이지를 새로고침해주세요. [0]`,
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
    const isIOSDevice = /(iPhone|iPod|iPad)/.test(navigator.userAgent)
    if (isIOSDevice) {
      setIsAndroid(false)
    }
  }, [])
  useEffect(() => {
    axios
      .post(process.env.REACT_APP_CREATEUSER, { pid })
      .then((res) => {})
      .catch((err) => {})
  }, [])

  const handleDownload = () => {
    setIsModalOpen(true)
  }

  return (
    <Backgroud>
      <MainSection>
        <MobileHeader />
        <Spacer space={50} />
        <span
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          다이렉트 카보 beta ver
        </span>
        {isMobile ? (
          <div style={{ marginLeft: 'auto' }}>
            <Spacer space={20} />
            <AppDownload Func={handleDownload} />
          </div>
        ) : (
          <div></div>
        )}

        <Spacer space={50} />
        <img
          src="/img/home_img.svg"
          alt="logo"
          width={249}
          height={200}
          style={{ margin: '0 auto' }}
        />
        <Spacer space={50} />
        <Input
          type="text"
          onChange={handleInput}
          maxLength={6}
          placeholder="비밀번호를 입력해주세요"
        />
        <Spacer space={12} />
        <LoginButton onClick={handleButton}>베타버전 확인하기</LoginButton>
        <Spacer space={8} />
        <span
          style={{
            fontSize: 12,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Beta Service
        </span>
        <Spacer space={80} />

        {isLoading && <Loading />}
        {isModalOpen && (
          <Overlay onClose={() => setIsModalOpen(false)}>
            {isAndroid ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ lineHeight: 1.5 }}>
                  홈화면에 바로가기 아이콘을 만드시려면 다음 스탭을
                  진행해주세요.
                </div>
                <Spacer space={15} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div>1. 우측하단 메뉴 선택</div>
                  <Spacer horizontal={false} space={10} />
                  <img
                    src="/img/androidMenu.svg"
                    alt="down"
                    width={16}
                    height={16}
                  />
                </div>
                <Spacer space={10} />
                <div>2. 다른 브라우저로 열기 or 현재 페이지 추가</div>
                <Spacer space={10} />
                <div>3. 홈화면에 추가</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ lineHeight: 1.4 }}>
                  하단 메뉴바 중앙에
                  <img
                    src="/img/iponeExport.svg"
                    alt="down"
                    width={16}
                    height={16}
                    style={{ marginLeft: 10, marginRight: 5 }}
                  />
                  아이콘을 눌러 홈화면에 바로가기를 만드실 수 있습니다.
                </div>
              </div>
            )}
            <Spacer space={20} />
            <StepButton
              buttonFunc={() => {
                setIsModalOpen(false)
              }}
              text={'확 인'}
              completed={true}
            />
          </Overlay>
        )}
      </MainSection>
    </Backgroud>
  )
}

export default Home

const Backgroud = styled.div`
  background: linear-gradient(
    to bottom,
    #5b8def,
    #5483df,
    #314f88,
    #263e6d,
    #263e6d 70%
  );
`
const Input = styled.input`
  height: 40px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 2px;
`
const LoginButton = styled.button`
  height: 40px;
  background-color: #5cdaa7;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  border: none;
`

// 모듈
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, batch } from 'react-redux'
import axios from 'axios'
// 리덕스
import {
  setIsOpen,
  setContent,
  setButtonText,
  setButtonFunc,
  close,
} from '../../actions/modal'
// 컴포넌트
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'
import StepError from './StepError'
// API
import getUrlParams from '../../apis/GetUrlParams'

const Compare = () => {
  // 사이트가 에러난경우 true로 변경
  const isSiteError = false

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  const [isReady, setIsReady] = useState(false)
  const { pid } = getUrlParams()

  const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7]

  const StepComponent = steps[step - 1]

  // 비밀번호 로그인 했는지 체크 (직접 compare url로 접속 blcok)
  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin')
    if (isLogin !== 'true') {
      setIsReady(false)
      navigate('/mo')
    } else {
      setIsReady(true)
    }
  }, [])

  //새로고침 막기
  useEffect(() => {
    const handleBeforUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforUnload)
    }
  }, [])

  //뒤로가기 막기
  useEffect(() => {
    const curPage = window.history.state.index
    if (curPage !== 'dumpPage') {
      window.history.pushState({ index: 'dumpPage' }, '', '')
    }

    function handleBackNavigation(e) {
      const isBack = window.confirm(
        '뒤로가시겠습니까? 뒤로가실경우 홈 화면으로 이동하게 됩니다.',
      )
      if (isBack) {
        window.removeEventListener('popstate', handleBackNavigation)
        window.history.go(-1)
      } else {
        window.history.pushState({ index: 'dumpPage' }, '', '')
      }
    }
    window.addEventListener('popstate', handleBackNavigation)
  }, [])

  //웹소켓 연결
  useEffect(() => {
    console.log(`${process.env.REACT_APP_WS}?id=${pid}`)
    const ws = new WebSocket(`${process.env.REACT_APP_WS}?id=${pid}`)

    return () => {
      ws.close()
    }
  }, [])

  //페이지 디자인시 사용
  useEffect(() => {
    // 페이지 디자인시 사용
    // setStep(3)
    // 페이지 디자인시 사용

    return () => {
      setStep(1)
    }
  }, [])
  return (
    <div>{isReady ? <StepComponent setStep={setStep} /> : <div></div>}</div>
  )
}

export default Compare

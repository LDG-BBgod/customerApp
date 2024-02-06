import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { changeIsMobile } from './actions/dealer'

import Admin from './screen/admin/admin'
import Home from './screen/mo/Home'
import Root from './screen/mo/Root'
import Compare from './screen/mo/Compare'
import CreatePid from './screen/mo/CreatePid'
import ErrorPage from './screen/mo/ErrorPage'
import ModalScreen from './components/mo/ModalScreen'

import getUrlParams from './apis/GetUrlParams'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { pid } = getUrlParams()
  const { isOpen, content, buttonText, buttonFunc } = useSelector(
    (state) => state.modal,
  )

  // 웹소켓 생성시하면서 삭제함
  // useEffect(() => {
  //   if (location.pathname !== '/mo/compare') {
  //     const shutDown = async () => {
  //       await axios
  //         .post(process.env.REACT_APP_SHUTDOWN, { pid })
  //         .catch((err) => {})
  //     }
  //     shutDown()
  //   }
  // }, [location])

  useEffect(() => {
    dispatch(changeIsMobile(isMobile))
  }, [dispatch])

  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Root} />
        <Route path="/admin" Component={Admin} />
        <Route path="/mo" Component={Home} />
        <Route path="/mo/compare" Component={Compare} />
        <Route path="/mo/cp" Component={CreatePid} />
        <Route path="/mo/error" Component={ErrorPage} />
      </Routes>
      {isOpen && (
        <ModalScreen
          content={content}
          buttonText={buttonText}
          buttonFunc={buttonFunc}
        />
      )}
    </div>
  )
}

export default App

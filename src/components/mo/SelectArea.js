import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useDispatch, useSelector, batch } from 'react-redux'

import {
  setIsOpen,
  setContent,
  setButtonText,
  setButtonFunc,
  close,
} from '../../actions/modal'

import Spacer from './Spacer'
import Overlay from './Overlay'

const SelectArea = ({
  text,
  boxText = '선택',
  selectFunc = null,
  optionFunc = null,
  options = null,
  resetFunc = null,
  step = null,
  posible = false,
}) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(null)
  const [arrData, setArrData] = useState([])

  const handleSelect = async () => {
    if (posible) {
      let list = await selectFunc(options)
      setArrData(list)
      setIsModalOpen(true)
    } else {
              batch(() => {
          dispatch(setIsOpen(true))
          dispatch(setContent(`이전단계를 먼저 선택해주세요.`))
          dispatch(setButtonText('확 인'))
          dispatch(
            setButtonFunc(() => {
              dispatch(close())
            }),
          )
        })
    }
  }
  const handleOption = (text, id) => {
    optionFunc({ text, id, state: true })
    setIsModalOpen(false)
  }

  // 뒤로가기 핸들링

  return (
    <div>
      <Text>{text}</Text>
      <Spacer space={8} />
      <Box
        onClick={() => {
          handleSelect()
          if (resetFunc) {
            resetFunc(step)
          }
        }}
      >
        {boxText}
      </Box>
      {isModalOpen && (
        <Overlay onClose={() => setIsModalOpen(false)}>
          <img
            src="/img/back.svg"
            alt="logo"
            style={{ width: 15, height: 15 }}
            onClick={() => {
              setIsModalOpen(false)
            }}
          />
          <Spacer space={15} />
          {arrData.map((item, index) => (
            <ListBox key={index}>
              <List
                id={item.cd}
                onClick={() => {
                  handleOption(
                    item.nm.replace(/\+/g, ' '),
                    item.cd.replace(/\+/g, ' '),
                  )
                }}
              >
                {item.nm.replace(/\+/g, ' ')}
              </List>
            </ListBox>
          ))}
        </Overlay>
      )}
    </div>
  )
}
export default SelectArea

const Text = styled.div`
  font-size: 12px;
`
const Box = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: #fff;
  border: solid 0.5px #cacaca;
  width: 100%;
  min-height: 40px;
  font-size: 14px;
  line-height: 18px;
  border-radius: 10px;
  text-align: center;
  color: #9f9f9f;
`
const ListBox = styled.div`
  box-sizing: border-box;
  width: 100%;
`
const List = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 10px;
  min-height: 40px;
  font-size: 12px;
  line-height: 16px;
  padding: 5px;
`

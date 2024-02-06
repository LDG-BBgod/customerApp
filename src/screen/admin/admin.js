import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'

import Spacer from '../../components/mo/Spacer'

const Admin = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [data, setData] = useState([])
  const [isLogin, setIsLogin] = useState(false)
  const [isList, setList] = useState(true)
  const [user, setUser] = useState({})

  const handleButton = async () => {
    await axios
      .post(process.env.REACT_APP_ADMINLOGIN, {
        id,
        pw,
      })
      .then((res) => {
        if (res.data) {
          setIsLogin(true)
          getDataBase()
        } else {
          setIsLogin(false)
        }
      })
      .catch((err) => {
        alert('에러발생 전화주셈')
      })
  }

  const getDataBase = async () => {
    await axios
      .post(process.env.REACT_APP_ADMINGETNAME, {
        id,
        pw,
      })
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        alert('에러발생 전화주셈')
      })
  }

  const handleListButton = async (name) => {
    await axios
      .post(process.env.REACT_APP_ADMINGETDETAIL, {
        id,
        pw,
        name,
      })
      .then((res) => {
        setList(false)
        setUser(res.data)
      })
      .catch((err) => {
        alert('에러발생 전화주셈')
      })
  }

  return (
    <>
      <Spacer space={50} />
      {isLogin ? (
        <>
          {isList ? (
            <>
              {data.map((item, index) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  key={index}
                >
                  <Spacer space={20} />
                  <CSButton
                    onClick={() => {
                      handleListButton(item.name)
                    }}
                  >
                    {item.isLooked ? '' : '| -------------- '}
                    {item.name}
                    {item.isLooked ? '' : ' -------------- |'}
                  </CSButton>
                </div>
              ))}
            </>
          ) : (
            <>
              <div
                style={{
                  margin: 'auto',
                  width: 1200,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '0.7fr 2.5fr 5fr',
                    gridGap: 10,
                  }}
                >
                  <div></div>
                  <div>딜러</div>
                  <div>딜러의 고객</div>
                  <button
                    style={{ width: 60, height: 30 }}
                    onClick={() => {
                      setList(true)
                      getDataBase()
                    }}
                  >
                    뒤로
                  </button>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 4fr',
                      gridTemplateRows: '30px 30px 1fr',
                      gridGap: 15,
                      border: 'solid 1px #5b8def',
                      height: 500,
                      overflow: 'auto',
                    }}
                  >
                    <div>이름</div>
                    <div>{user.name}</div>
                    <div>전화번호</div>
                    <div>{user.phone}</div>
                    <div>로그</div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{user.log}</div>
                  </div>
                  <div>
                    {user.customer.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '100px 1fr',
                          gridGap: 10,
                          border: 'solid 1px #5b8def',
                          marginBottom: 10,
                          height: 500,
                          overflow: 'auto',
                        }}
                      >
                        <div>이름</div>
                        <div>{item.csname}</div>
                        <div>폰번뒤4자리</div>
                        <div>{item.phoneAuth}</div>
                        <div>주민앞</div>
                        <div>{item.fsn}</div>
                        <div>주민뒤</div>
                        <div>{item.bsn}</div>
                        <div>차량정보1</div>
                        <div>{item.carValue1}</div>
                        <div>차량정보2</div>
                        <div>{item.carValue2}</div>
                        <div>차량정보3</div>
                        <div>{item.carValue3}</div>
                        <div>차량정보4</div>
                        <div>{item.carValue4}</div>
                        <div>차량정보5</div>
                        <div>{item.carValue5}</div>
                        <div>운전자범위</div>
                        <div>{item.range}</div>
                        <div>최소연령</div>
                        <div>{item.minBirth}</div>
                        <div>두번째연령</div>
                        <div>{item.secondBirth}</div>
                        <div>보장정도</div>
                        <div>{item.level}</div>
                        <div>옵션1</div>
                        <div>{item.option1}</div>
                        <div>옵션2</div>
                        <div>{item.option2}</div>
                        <div>옵션3</div>
                        <div>{item.option3}</div>
                        <div>옵션4</div>
                        <div>{item.option4}</div>
                        <div>옵션5</div>
                        <div>{item.option5}</div>
                        <div>옵션6</div>
                        <div>{item.option6}</div>
                        <div>옵션7</div>
                        <div>{item.option7}</div>
                        <div>옵션8</div>
                        <div>{item.option8}</div>
                        <div>산출결과</div>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                          {item.list}
                        </div>
                        <div>결과전송</div>
                        <div>
                          {item.sendContent.map((item, index) => (
                            <div key={index} style={{ display: 'flex' }}>
                              <div>{item.phoneSend}</div>
                              <Spacer horizontal={false} space={10} />
                              <div>{item.insuType}</div>
                              <Spacer horizontal={false} space={10} />
                              <div>{item.insuList}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <input
            placeholder="아이디"
            onChange={(e) => {
              setId(e.target.value)
            }}
          />
          <input
            placeholder="비밀번호"
            onChange={(e) => {
              setPw(e.target.value)
            }}
          />
          <button onClick={handleButton}>로그인</button>
        </div>
      )}
      <Spacer space={50} />
    </>
  )
}

export default Admin

const CSButton = styled.button`
  height: 40px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px #5b8def;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
`

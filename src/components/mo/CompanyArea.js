import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Spacer from './Spacer'

const CompanyArea = ({ data = null, selected = false, func = null }) => {
  const [isTrue, setIsTrue] = useState(false)
  const Box = ({ children }) => {
    return (
      <div
        style={{
          textAlign: 'center',
          boxSizing: 'border-box',
          backgroundColor: `${selected ? `#DBE9FF` : '#fff'}`,
          width: `100%`,
          height: 40,
          border: `solid 0.5px ${selected ? '#5b8def' : '#cacaca'}`,
          borderRadius: 10,
          display: 'grid',
          gridTemplateColumns: `1fr 3fr 2.5fr 1fr`,
          justifyItems: 'center',
          alignItems: 'center',
        }}
        onClick={func}
      >
        {children}
      </div>
    )
  }
  const isMoney = data.money !== '조회불가'
  useEffect(() => {
    if (
      data.name === 'INSU2' ||
      data.name === 'INSU5' ||
      data.name === 'INSU6' ||
      data.name === 'INSU7' ||
      data.name === 'INSU8' ||
      data.name === 'INSU10'
    ) {
      setIsTrue(true)
    }
  }, [data.name])

  return (
    <div>
      {isTrue ? (
        <Box>
          <Text1>{data.rank}</Text1>
          <img src={`/img/${data.name}.svg`} alt="logo" width={100} />
          {isMoney ? (
            <Text2>{data.money} 원</Text2>
          ) : (
            <Text2>{data.money}</Text2>
          )}

          {selected ? (
            <img
              src={`/img/companySelect.svg`}
              alt="logo"
              height={20}
              width={10}
            />
          ) : (
            <img
              src={`/img/companyUnSelect.svg`}
              alt="logo"
              height={20}
              width={10}
            />
          )}
        </Box>
      ) : (
        (<Box>
          <Text11>{data.rank}</Text11>
          <img src={`/img/${data.name}.svg`} alt="logo" width={100} />
          {isMoney ? (
            <Text22>{data.money} 원</Text22>
          ) : (
            <Text22>{data.money}</Text22>
          )}

          {selected ? (
            <img
              src={`/img/companySelect.svg`}
              alt="logo"
              height={20}
              width={10}
            />
          ) : (
            <img
              src={`/img/companyUnSelect.svg`}
              alt="logo"
              height={20}
              width={10}
            />
          )}
        </Box>)
      )}
    </div>
  )
}

export default CompanyArea

const Text1 = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #9f9f9f;
`
const Text11 = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #9f9f9f;
`
const Text2 = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #9f9f9f;
`
const Text22 = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #9f9f9f;
`

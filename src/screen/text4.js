const Text4 = () => {
  return (
    <div>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          fontSize: 12,
          lineHeight: 1.2,
        }}
      >
        {`
민감정보 및 고유식별정보의 처리에 관한 사항

보험료 확인 서비스를 이용하기 위해서는 손해보험협회의 보험 다모아 기능을 이용합니다. 이에 따른, 개인정보 처리 동의에 관한 사항입니다.

손해보험협회는「개인정보보호법」 및 「신용정보의 이용 및 보호에 관한 법률」에 따라 다음과 같이 고객의 민감정보(교통법규 위반 이력), 고유식별정보(주민등록번호, 외국인 등록번호)를 처리(수집 · 이용, 조회, 제공) 하고자 합니다.
`}
      </pre>
    </div>
  )
}

export default Text4

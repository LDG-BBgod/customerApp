const AuthArea = ({ text, isChecked, onChange }) => {
  const CheckArea = () => {
    return (
      <div style={{ width: '100%' }} onClick={handleChange}>
        {isChecked ? (
          <div
            style={{
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              border: 'solid 0.5px #5b8def',
              borderRadius: 5,
              fontSize: 12,
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            {text}
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              border: 'solid 0.5px #5b8def',
              borderRadius: 5,
              fontSize: 12,
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            {text}
          </div>
        )}
      </div>
    )
  }
  const handleChange = () => {
    onChange(!isChecked)
  }

  return <CheckArea />
}

export default AuthArea

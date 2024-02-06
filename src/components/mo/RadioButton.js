const RadioButton = ({
  buttonFunc = null,
  text = null,
  selected = true,
  nonSlectedButtonFunc = null,
}) => {
  return selected ? (
    <button
      onClick={buttonFunc}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: 35,
        color: '#fff',
        backgroundColor: '#5b8def',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        border: 'none',
        borderRadius: 5,
      }}
    >
      {text}
    </button>
  ) : (
    <button
      onClick={nonSlectedButtonFunc}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: 35,
        color: '#fff',
        backgroundColor: '#CACACA',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        border: 'none',
        borderRadius: 5,
      }}
    >
      {text}
    </button>
  )
}
export default RadioButton

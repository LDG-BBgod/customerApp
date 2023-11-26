const StepButton = ({
  buttonFunc = null,
  text = null,
  completed = false,
  nonCompletedButtonFunc = null,
  backgroundColor = '#5b8def',
}) => {
  return completed ? (
    <button
      onClick={buttonFunc}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: 40,
        color: '#fff',
        backgroundColor: backgroundColor,
        fontSize: 16,
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
      onClick={nonCompletedButtonFunc}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: 40,
        color: '#fff',
        backgroundColor: '#CACACA',
        fontSize: 16,
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
export default StepButton

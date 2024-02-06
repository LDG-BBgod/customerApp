const Spacer = ({ horizontal = true, space = 0 }) => {
  if (horizontal) {
    return <div style={{ marginTop: space }} />
  } else {
    return <div style={{ marginLeft: space }} />
  }
}
export default Spacer

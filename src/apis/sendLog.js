import axios from 'axios'

const sendLog = (pid, data, type) => {
  axios
    .post(process.env.REACT_APP_UPDATEUSER, { pid, data, type })
    .then((res) => {})
    .catch((err) => {})
}

export default sendLog

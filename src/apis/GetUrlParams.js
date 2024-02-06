import { useLocation } from 'react-router-dom'

const GetUrlParams = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const dtype =
    queryParams.get('dtype') !== null ? queryParams.get('dtype') : 'B'
  const pid = queryParams.get('pid') !== null ? queryParams.get('pid') : 'undef'
  return { dtype, pid }
}

export default GetUrlParams

import { useEffect, useState } from "react"

const useStepDelay = <T>(state: T) => {
  const [_state, _setState] = useState({current: state, prev: state})

  useEffect(() => {
    _setState(_state => ({ prev: _state.current, current: state }))
  }, [state])

  return _state.prev
}

export default useStepDelay
import { useCallback, useState } from "react"

const usePrevState = <T, S = T>(init: T | (() => T), prevInit: S | (() => S)) => {
  const [_state, _setState] = useState<T>(init)
  const [prevState, setPrevState] = useState<T | S>(prevInit)
  const setState = useCallback((state: React.SetStateAction<T>) => {
    setPrevState(_state)
    _setState(state)
  }, [_state])
  return [_state, prevState, setState] as const
}

export default usePrevState
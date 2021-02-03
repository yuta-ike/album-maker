import { useEffect } from "react"
import useStepDelay from "./useStepDelay"

const useEffectWhen = <T>(body: () => void, dep: T, func: (prev: T, current: T) => boolean) => {
  const prevState = useStepDelay(dep)
  useEffect(() => {
    if (func(prevState, dep)){
      body()
    }
  }, [body, dep, prevState, func])
}

export default useEffectWhen

export const LARGER = <T>(prev: T, current: T) => prev < current
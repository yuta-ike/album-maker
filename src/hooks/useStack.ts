import { useCallback, useState } from "react"

const useStack = <T>(init: T[] | (() => T[])) => {
  const [state, setState] = useState<T[]>(init)
  const push = useCallback((item: T) => {
    setState(prev => [...prev, item])
  }, [])
  
  const pop = useCallback(() => {
    setState(prev => {
      const newStack = [...prev]
      newStack.pop()
      return newStack
    })
  }, [])
  
  const clear = useCallback(() => {
    setState([])
  }, [])
  
  const pushMany = useCallback((items: T[]) => {
    setState(prev => [...prev, ...items])
  }, [])

  const popUntil = useCallback((predicate: (item: T) => boolean) => {
    setState(_prev => {
      const prev = [..._prev]
      while (prev.length > 0){
        const item = prev.pop()
        if(item === undefined){
          return []
        }
        if(predicate(item)){
          return [...prev, item]
        }
      }
      return []
    })
  }, [])

  return { stack: state, push, pop, clear, pushMany, top: state[state.length - 1], popUntil }
}

export default useStack
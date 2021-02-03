import { useCallback, useEffect, useRef, useState } from "react"

// NOTE: https://qiita.com/irico/items/20e1d33724edc0dad012
const useScroll = <T>(func: (scroll: number) => T) => {
  const [scroll, setScroll] = useState<T>(func(0))
  const [direction, setDirection] = useState<null | "forward" | "backward">(null)
  const prevScroll = useRef(0)
  const isRunning = useRef(false)

  // リスナに登録する関数
  const isScrollToggle = useCallback(() => {
    if (isRunning.current) return
    isRunning.current = true
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const reqId = requestAnimationFrame(() => {
      setScroll(func(scrollTop))
      setDirection(prevScroll.current === scrollTop ? null : prevScroll.current < scrollTop ? "forward" : "backward")
      prevScroll.current = scrollTop
      isRunning.current = false
    })
    return () => cancelAnimationFrame(reqId)
  }, [setScroll, func])

  useEffect(() => {
    document.addEventListener('scroll', isScrollToggle, { passive: true })
    return () => {
      document.removeEventListener('scroll', isScrollToggle)
    }
  }, [isScrollToggle])

  return { state: scroll, direction }
}

export default useScroll
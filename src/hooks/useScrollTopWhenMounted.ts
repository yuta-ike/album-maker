import { useEffect } from "react"

const useScrollTopWhenMounted = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [])
}

export default useScrollTopWhenMounted
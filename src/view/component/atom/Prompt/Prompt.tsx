import React from 'react'
import { Prompt as ReactRouterPrompt } from 'react-router-dom'

type Props = {
  when?: boolean
}

const Prompt: React.FC<Props> = ({ when }) => {
  return (
    <ReactRouterPrompt
      when={when}
      message={(location) => {
        console.log(location)
        if (location.pathname === "/" || location.pathname === "/print") {
          return true
        } else {
          return "作業内容が失われます。移動しますか？"
        }
      }}
    />
  )
}

export default Prompt

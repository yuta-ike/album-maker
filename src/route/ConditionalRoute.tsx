import React, { ComponentProps } from 'react'
import { Redirect, Route } from 'react-router-dom'

type Props = ComponentProps<typeof Route> & {
  when: boolean
  redirectUrl: string
}

const PrivateRoute: React.FC<Props> = ({ when, redirectUrl, ...props }) => {
  if (when) {
    return (
      <Route {...props} />
    )
  } else {
    return (
      <Redirect to={redirectUrl} />
    )
  }
}

export default PrivateRoute

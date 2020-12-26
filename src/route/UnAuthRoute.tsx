import React, { ComponentProps } from 'react'
import { useUserStateValues } from '../context/UserProvider'
import ConditionalRoute from './ConditionalRoute'

type Props = Omit<ComponentProps<typeof ConditionalRoute>, "when">

const UnAuthRoute: React.FC<Props> = ({ ...props }) => {
  const { isAuthCompleted } = useUserStateValues()
  return <ConditionalRoute {...props} when={!isAuthCompleted} />
}

export default UnAuthRoute

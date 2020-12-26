import React from 'react'
import Button from '@material-ui/core/Button'
import { auth } from '../../util/firebase'
import authProvider from '../../util/authProvider'

const Login: React.FC = () => {
  const handleLogin = async () => {
    await auth.signInWithRedirect(authProvider)
  }

  return (
    <div>
      <div className="text-red">認証ぺーじ
      </div>
      <Button onClick={handleLogin}>ログイン</Button>
    </div>
  )
}

export default Login

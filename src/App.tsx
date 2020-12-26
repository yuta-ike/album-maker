import React from 'react'
import UserProvider from './context/UserProvider'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PrivateRoute from './route/PrivateRoute'
import UnAuthRoute from './route/UnAuthRoute'
import Login from './pages/Login/Login'
import Index from './pages/index/Index'
import './App.css'

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <UnAuthRoute path="/login" redirectUrl="/" component={Login}/>
          <PrivateRoute path="/" redirectUrl="/login" component={Index}/>
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App

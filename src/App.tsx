import React, { useEffect } from 'react'
import UserProvider, { useUserActions, useUserStateValues } from './state/context/UserProvider'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import PrivateRoute from './route/PrivateRoute'
import UnAuthRoute from './route/UnAuthRoute'
import Login from './view/page/Login/Login'
import Home from './view/page/Home/Home'
import './App.scss'
import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'
import swrConfig from './util/swr/swrConfig'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import fileReducers from './state/reducks/files'
import Print from './view/page/Print/Print'
import PrivacyPolicy from './view/page/PrivacyPolicy/PrivacyPolicy'
import TermsOfUse from './view/page/TermsOfUse/TermsOfUse'
import Loading from './view/component/organization/Loading'

const stores = createStore(fileReducers)

const Pages: React.FC = () => {
  const { isLoading } = useUserStateValues()
  const { reAuth } = useUserActions()
  const handleAPICallError = (err: any) => {
    if (err.code === "InvalidAuthenticationToken") {
      reAuth()
    }
  }

  useEffect(() => {
    const listener = (e: any) => {
      if(window.location.pathname === "/login") return;
      e.preventDefault()
      e.returnValue = '作業内容が失われます。本当に移動しますか？'
      return '作業内容が失われます。本当に移動しますか？'
    }
    window.addEventListener("beforeunload", listener)
    return () => window.removeEventListener("beforeunload", listener)
  }, [])

  return (
    <ReduxProvider store={stores}>
      <SWRConfig value={{ ...swrConfig, onError: handleAPICallError }}>
        <ChakraProvider>
          {isLoading && <Loading/>}
          <Router>
            <Switch>
              <UnAuthRoute exact path="/login" redirectUrl="/" component={Login}/>
              <PrivateRoute exact path="/" redirectUrl="/login" component={Home} />
              <PrivateRoute exact path="/print" redirectUrl="/login" component={Print} />
              <Route exact path="/privacy" redirectUrl="/login" component={PrivacyPolicy} />
              <Route exact path="/terms" redirectUrl="/login" component={TermsOfUse} />
              <Redirect to="/login"/>
            </Switch>
            {/* <Route exact path="/" component={() => <Prompt
              message={(location, action) => {
                console.log(action)

                if (location.pathname === "/" || location.pathname === "/print"){
                  return true
                }else{
                  return "作業内容が失われます。移動しますか？"
                }
              }}
            />} />
            <Route exact path="/print" component={() => <Prompt
              message={(location, action) => {
                console.log(action)

                if (location.pathname === "/" || location.pathname === "/print") {
                  return true
                } else {
                  return "作業内容が失われます。移動しますか？"
                }
              }}
            />} /> */}
          </Router>
        </ChakraProvider>
      </SWRConfig>
    </ReduxProvider>
  )
}

const App = () => (
  <UserProvider>
    <Pages/>
  </UserProvider>
)

export default App

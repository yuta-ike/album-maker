import { Dispatch, SetStateAction, useCallback } from 'react'
import React, { useEffect, createContext, useState, useContext } from 'react'
import { auth } from '../../util/firebase'
import firebase from '../../util/firebase'
import { Client } from '@microsoft/microsoft-graph-client'
import authProvider from '../../util/authProvider'

type UserStates = {
  isLoading: boolean
  user: firebase.User | null | undefined
  client: Client | null | undefined
  isAuthCompleted: boolean
}

type UserActions = {
  signOut: () => Promise<void>
  reAuth: () => Promise<void>
}

const UserStateValuesContext = createContext<UserStates>({ isLoading: false, user: null, client: null, isAuthCompleted: false })
const SetUserStateContext = createContext<Dispatch<SetStateAction<UserStates>>>(() => {})
const UserActionContext = createContext<UserActions>({ signOut: async () => { }, reAuth: async () => { } })

const createClient = (accessToken: string) => Client.init({
  authProvider: (authDone) => {
    authDone(new Error(), accessToken)
  }
})

const UserProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<UserStates>({ isLoading: true, user: undefined, client: undefined, isAuthCompleted: false })
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthData(prev => ({ ...prev, user }))
    })

    const storedAccessToken = localStorage.getItem("ACCESS_TOKEN")
    if (storedAccessToken != null) {
      setAuthData(prev => ({ ...prev, client: createClient(storedAccessToken) }))
    }

    auth.getRedirectResult().then((result: any) => {
      if (result.credential != null) {
        const accessToken = result.credential.accessToken
        const client = createClient(accessToken)
        setAuthData(prev => ({ ...prev, client }))
        localStorage.setItem("ACCESS_TOKEN", accessToken)
      }else{
        setAuthData(prev => ({ ...prev, client: prev.client === undefined ? null : prev.client }))
      }
    })
  }, [])

  const signOut = useCallback(async () => {
    await auth.signOut()
    localStorage.removeItem("ACCESS_TOKEN")
  }, [])

  const reAuth = useCallback(async () => {
    auth.currentUser?.reauthenticateWithRedirect(authProvider)
  }, [])

  const isAuthCompleted = authData.user != null && authData.client != null
  useEffect(() => {
    setAuthData(prev => ({ ...prev, isAuthCompleted }))
  }, [isAuthCompleted])

  const isLoading = !(authData.user !== undefined && authData.client !== undefined)
  useEffect(() => {
    setAuthData(prev => ({ ...prev, isLoading }))
  }, [isLoading])
  
  return (
    <UserStateValuesContext.Provider value={authData}>
      <SetUserStateContext.Provider value={setAuthData}>
        <UserActionContext.Provider value={{signOut, reAuth}}>
          { children }
        </UserActionContext.Provider>
      </SetUserStateContext.Provider>
    </UserStateValuesContext.Provider>
  )
}

export default UserProvider

export const useUserStateValues = () => useContext(UserStateValuesContext)
export const useSetUserState = () => useContext(SetUserStateContext)
export const useUserState = () => [useUserStateValues(), useSetUserState()]
export const useUserActions = () => useContext(UserActionContext)
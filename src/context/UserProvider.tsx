import { Dispatch, SetStateAction } from 'react'
import React, { useEffect, createContext, useState, useContext } from 'react'
import { auth } from '../util/firebase'
import firebase from '../util/firebase'
import { Client } from '@microsoft/microsoft-graph-client'

type UserStates = {
  user: firebase.User | null
  client: Client | null
  isAuthCompleted: boolean
}

const UserStateValuesContext = createContext<UserStates>({ user: null, client: null, isAuthCompleted: false })
const SetUserStateContext = createContext<Dispatch<SetStateAction<UserStates>>>(() => {})

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserStates>({ user: null, client: null, isAuthCompleted: false })
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(prev => ({ ...prev, user }))
      console.log("USER: ", user)
    })

    auth.getRedirectResult().then((result: any) => {
      if(result.credential != null){
        ;(async () => {
          const client = Client.init({
            authProvider: (authDone) => {
              authDone(new Error(), result.credential.accessToken)
            }
          })
          setUser(prev => ({ ...prev, client }))
          client.api("/me").get().then((res) => console.log("ME: ", res))
        })()
      }
    })
  }, [])

  const isAuthCompleted = user.user != null && user.client != null

  useEffect(() => {
    setUser(prev => ({ ...prev, isAuthCompleted }))
  }, [isAuthCompleted])

  return (
    <UserStateValuesContext.Provider value={user}>
      <SetUserStateContext.Provider value={setUser}>
        { children }
      </SetUserStateContext.Provider>
    </UserStateValuesContext.Provider>
  )
}

export default UserProvider

export const useUserStateValues = () => useContext(UserStateValuesContext)
export const useSetUserState = () => useContext(SetUserStateContext)
export const useUserState = () => [useUserStateValues(), useSetUserState()]
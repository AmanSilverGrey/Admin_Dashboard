import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
// import {AuthModel, UserModel} from './_models'

import * as authHelper from './AuthHelpers'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import {signOut} from 'firebase/auth'
import {auth} from '../firebase'
// import { json } from 'node:stream/consumers'
// import { useNavigate } from 'react-router-dom'

// type AuthContextProps = {
//   auth: AuthModel | undefined
//   saveAuth: (auth: AuthModel | undefined) => void
//   currentUser: UserModel | undefined
//   setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
//   logout: () => void
// }

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
  //  const navigate = useNavigate();
  const [auth, setAuth] = useState(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState()
  const [currentUserDetails, setCurrentUserDetails] = useState()

  useEffect(() => {
    const cUser = localStorage.getItem('user')
    setCurrentUser(JSON.parse(cUser))
  }, [])

  const saveAuth = (auth) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
    localStorage.removeItem('user')
    localStorage.removeItem('User-Details')
    localStorage.removeItem('Developers')
    console.log('User log out')
    window.location.reload()
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken) => {
      try {
        if (!didRequest.current) {
          const {data} = await getUserByToken(apiToken)
          if (data) {
            // setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          // logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth && auth.api_token) {
      requestUser(auth.api_token)
    } else {
      // logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}

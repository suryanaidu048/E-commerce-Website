"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { onAuthStateChange, getUserData, signOut } from "@/lib/auth"

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        userData: action.payload.userData,
        isAuthenticated: true,
        loading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        userData: null,
        isAuthenticated: false,
        loading: false,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

const initialState = {
  user: null,
  userData: null,
  isAuthenticated: false,
  loading: true,
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        const userData = await getUserData(user.uid)
        dispatch({
          type: "LOGIN",
          payload: { user, userData },
        })
      } else {
        dispatch({ type: "LOGOUT" })
      }
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await signOut()
    dispatch({ type: "LOGOUT" })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

import * as actionTypes from './actionTypes'
import axios from '../../axios-retrobits'
import { isSuper } from '@babel/types'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const auth = (name, email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())

    // const authData = {
    //   name: name,
    //   email: email,
    //   password: password,
    // }

    // let url = isSignup ? 'register' : 'login'

    axios
      .post(isSignup ? 'register' : 'login', { name, email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        dispatch(authSuccess(response.data.token))
      })
      .catch(error => {
        dispatch(authFail(error.response.data.message))
      })
  }
}

export const logout = () => {
  localStorage.removeItem('token')

  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      dispatch(authSuccess(token))
    }
  }
}

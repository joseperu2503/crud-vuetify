import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import jwt_decode from 'jwt-decode'
import type {JwtPayload} from 'jwt-decode'

export function useToken() {

  const saveToken = (token: string) => {
    setCookie('token', token, {expires: 365, path: '/'})
  }

  const getToken = () => {
    const token = getCookie('token')
    return token
  }

  const removeToken = () => {
    removeCookie('token')
  }

  const isValidToken = () => {
    console.log('isValidToken')
    const token = getToken()
    if(!token){
      return false
    }

    const decodeToken = jwt_decode<JwtPayload>(token)
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0)
      tokenDate.setUTCSeconds(decodeToken.exp)
      const today = new Date()
      return tokenDate.getTime() > today.getTime()
    }
    return false
  }

  return {
    saveToken,
    getToken,
    removeToken,
    isValidToken
  }
}

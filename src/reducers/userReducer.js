import { browserHistory } from 'react-router'

export default function userReducer( state=[], action ){
  switch (action.type) {
    case 'LOGIN_USER':
    debugger
      browserHistory.push('/home')
      return action.payload.user
    case 'CREATE_USER':
      return action.payload
    case 'ADD_USER':
      return state
    case 'FETCH_USER':

      return action.payload.data
    default:
      return state
  }
}

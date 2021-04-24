const initialState = {
  message: '',
  display: 'none'
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.message,
        display: ''
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer
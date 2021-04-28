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

let timeoutId;

export const setNotification = (message, time = 5) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(
      () => dispatch(clearNotification()),
      time*1000
    )
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const filterAnecdotes = (filterString) => {
  return {
    type: 'SET_FILTER',
    data: filterString
  }
}

export default reducer
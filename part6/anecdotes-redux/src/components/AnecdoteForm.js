import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdoteHandler = async (event) => {
    // Clear the form
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))

    // Display a notification for 5 seconds
    dispatch(setNotification(`New anecdote created: '${content}'`, 3))
  }

  return (
    <form onSubmit={addAnecdoteHandler}>
      <h2>create new</h2>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
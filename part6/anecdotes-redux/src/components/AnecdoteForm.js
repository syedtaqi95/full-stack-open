import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, getId } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdoteHandler = (event) => {
    // Clear the form
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = {
      content,
      id: getId(),
      votes: 0
    }

    dispatch(createAnecdote(newAnecdote))

    // Display a notification for 5 seconds
    dispatch(setNotification(`New anecdote created: '${content}'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
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
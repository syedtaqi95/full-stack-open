import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdoteHandler = async (event) => {
    // Clear the form
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)

    // Display a notification for 5 seconds
    props.setNotification(`New anecdote created: '${content}'`, 3)
  }

  return (
    <form onSubmit={addAnecdoteHandler}>
      <h2>create new</h2>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
) (AnecdoteForm)

export default ConnectedAnecdoteForm
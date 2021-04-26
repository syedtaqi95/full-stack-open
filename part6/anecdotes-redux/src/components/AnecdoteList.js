import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filterText = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.includes(filterText)))
  const dispatch = useDispatch()

  const voteHandler = (anecdote) => {
    dispatch(vote(anecdote))
    // Display a notification for 5 seconds
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 3))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes) // sort in descending order
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteHandler(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>

  )
}

export default AnecdoteList
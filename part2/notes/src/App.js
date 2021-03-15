import React, { useState, useEffect } from 'react'
import Note from './Note'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get("http://localhost:3001/notes")
      .then(response => {
        console.log("promise fulfilled")
        setNotes(response.data)
      })
  }
  useEffect(hook, [])

  const AddNote = (e) => {
    e.preventDefault()
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObj))
    setNewNote('')
  }

  const handleNewNote = (e) => {
    setNewNote(e.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={AddNote}>
        <input value={newNote} onChange={handleNewNote} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
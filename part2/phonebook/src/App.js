import React, { useState } from 'react'

const Number = ({person}) => {
  return (
    <div>
      {person.name}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNumber = (e) => {
    e.preventDefault()

    const newNumber = { name: newName}
    setPersons(persons.concat(newNumber))
    setNewName("")
  }

  const handleNewName = (e) => setNewName(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>      
      <form onSubmit={addNumber}>
        <div>
          name: <input autoFocus value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person => <Number key={person.name} person={person} /> )}
    </div>
  )
}

export default App
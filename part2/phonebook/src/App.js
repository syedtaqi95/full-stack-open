import React, { useState } from 'react'

const Number = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addNumber = (e) => {
    e.preventDefault()
    const newEntry = { name: newName, number: newNumber}

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newEntry))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)
  const handleFilterName = (e) => setFilterName(e.target.value)

  const personsToShow = (filterName === "") ? [...persons]
  : persons.filter( (person) => {
        const nameLowerCase = person.name.toLowerCase()
        const filterNameLower = filterName.toLowerCase()
        return nameLowerCase.includes(filterNameLower)
      }
    )  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterName} onChange={handleFilterName} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input autoFocus value={newName} onChange={handleNewName} />
          <br />
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {personsToShow.map(person => <Number key={person.name} person={person} />)}
    </div>
  )
}

export default App
import React, { useState } from 'react'
import Filter from './Filter'
import Form from './Form'
import Numbers from './Numbers'

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
    const newEntry = { name: newName, number: newNumber }

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
    : persons.filter((person) => {
      const nameLowerCase = person.name.toLowerCase()
      const filterNameLower = filterName.toLowerCase()
      return nameLowerCase.includes(filterNameLower)
    }
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h2>add a new</h2>
      <Form addNumber={addNumber} newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} />
    </div>
  )
}

export default App
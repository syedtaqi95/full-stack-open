import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import Form from './Form'
import Numbers from './Numbers'
import PersonsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const getInitialNumbers = () => {
    PersonsService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }
  useEffect(getInitialNumbers, [])

  const addNumber = (e) => {
    e.preventDefault()
    const newEntry = { name: newName, number: newNumber }

    if (persons.some(p => p.name === newName)) {
      const prompt = `${newName} is already added to phonebook, replace the old number with a new one?`
      if(window.confirm(prompt)) {
        const id = persons.find(p => p.name === newName).id
        PersonsService.update(id, newEntry).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        })
        .catch(error => {
          alert(
            `the person '${newEntry.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== id))
        })        
        setNewName("")
        setNewNumber("")
      }
    }
    else {
      PersonsService
        .create(newEntry)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const deleteNumber = (e) => {
    e.preventDefault()
    const name = e.target.firstChild.data
    const id = persons.find((p) => p.name === name).id
    
    if(window.confirm(`Delete ${name}?`)) {
      PersonsService.deletePerson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id ))
      })
      .catch(error => {
        console.log('could not delete number as it doesn\'t exist')
      })      
    }
  }

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)
  const handleFilterName = (e) => setFilterName(e.target.value)

  const personsToShow = (filterName === "") 
    ? [...persons]
    : persons.filter((person) => {
        const nameLowerCase = person.name.toLowerCase()
        const filterNameLower = filterName.toLowerCase()
        return nameLowerCase.includes(filterNameLower)
      })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h2>add a new</h2>
      <Form addNumber={addNumber} newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} deleteNumber={deleteNumber} />
    </div>
  )
}

export default App
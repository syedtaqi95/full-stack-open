import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { SET_BIRTHYEAR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message }) => console.log(`[GraphQL error]: ${message}`))

      if (networkError)
        console.log(`[Network error]: ${networkError}`)
    }
  })

  const submit = async (e) => {
    e.preventDefault()
    setBirthYear({ variables: { name, setBornTo: parseInt(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            options={options}
            onChange={(selectedOption) => setName(selectedOption.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm
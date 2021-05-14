import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  // Username and password state hooks
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // GQL mutation to login
  const [login, result] = useMutation(LOGIN, {
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message }) => console.log(`[GraphQL error]: ${message}`))

      if (networkError)
        console.log(`[Network error]: ${networkError}`)
    }
  })

  // Save token to localStorage
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
      props.getUser()
    }
  }, [result.data]) // eslint-disable-line

  // Form event handler
  const handleSubmit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
    props.setPage('authors')
  }

  if (!props.show)
    return null

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
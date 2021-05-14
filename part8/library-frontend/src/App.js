import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  // State and Query hooks
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token)
      setToken(token)
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore() // resets the Apollo cache
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={handleLogout}>logout</button>
          </span>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsResult.loading ? [] : authorsResult.data.allAuthors}
        showBirthYearForm={token ? true : null}
      />

      <Books
        show={page === 'books'}
        books={booksResult.loading ? [] : booksResult.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App
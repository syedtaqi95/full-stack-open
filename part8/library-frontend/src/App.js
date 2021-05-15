import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery, useLazyQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, GET_USER } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
  // State and Query hooks
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const [getUser, userResult] = useLazyQuery(GET_USER, {
    fetchPolicy: "network-only" // to fetch data from the server if resetStore() is called
  })
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
      getUser()
    }
  }, []) // eslint-disable-line

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
            <button onClick={() => setPage('recommend')}>recommend</button>
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

      <Recommendations
        show={page === 'recommend'}
        userResult={userResult}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        getUser={getUser}
      />

    </div>
  )
}

export default App
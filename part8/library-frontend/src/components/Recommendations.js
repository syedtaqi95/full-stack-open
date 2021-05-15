import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_BY_GENRE } from '../queries'

const Recommendations = (props) => {
  const [recBooks, setRecBooks] = useState([])
  const [genre, setGenre] = useState('')
  const [getBooksByGenre, booksResult] = useLazyQuery(BOOKS_BY_GENRE)
  const user = props.userResult.data

  // Find the user's favorite genre
  useEffect(() => {
    if (user) {
      try {
        const favoriteGenre = user.me.favoriteGenre
        setGenre(favoriteGenre)
        getBooksByGenre({ variables: { genre: favoriteGenre } })
      } catch (err) { }
    }
  }, [user, getBooksByGenre])

  // Save query result to state
  useEffect(() => {
    if (booksResult.data)
      setRecBooks(booksResult.data.allBooks)
  }, [booksResult])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      {user
        ? <div><div>books in your favourite genre <b>{genre}</b></div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  author
            </th>
                <th>
                  published
            </th>
              </tr>
              {recBooks.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        : <div>loading...</div>
      }

    </div>
  )
}

export default Recommendations
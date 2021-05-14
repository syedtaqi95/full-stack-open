import React, { useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  const books = props.books

  // Find genres
  const genreSet = new Set()
  books.forEach(book => {
    book.genres.map(genre => genreSet.add(genre))
  })
  const genres = [...genreSet]
  
  const displayedBooks = selectedGenre === 'all genres' 
    ? books
    : books.filter(book => book.genres.includes(selectedGenre))

  const selectGenre = (e) => {
    e.preventDefault()
    setSelectedGenre(e.target.value)
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <div>in genre <b>{selectedGenre}</b></div>

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
          {displayedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {genres.map(genre => <button key={genre} value={genre} onClick={selectGenre}>{genre}</button>)}
        <button value="all genres" onClick={selectGenre}>all genres</button>
      </div>
    </div>
  )
}

export default Books
import React from 'react'

const Recommendations = (props) => {
  // Find the user's favorite genre and filter book list
  let books = props.books
  const userResult = props.userResult
  let favoriteGenre = null

  try {
    if (userResult.data) {
      favoriteGenre = userResult.data.me.favoriteGenre
      books = books.filter(book => book.genres.includes(favoriteGenre))
    }
  } catch (err) { }


  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      {userResult.data
        ? <div><div>books in your favourite genre <b>{favoriteGenre}</b></div>
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
              {books.map(a =>
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
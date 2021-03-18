import React from 'react'

const Number = ({ person, deleteNumber }) => {
    return (
        <form onSubmit={deleteNumber}>
            {person.name} {person.number} <button>delete</button>
        </form>
    )
}

const Numbers = ({ personsToShow, deleteNumber }) => {
    return (
        personsToShow.map(person => <Number key={person.name} person={person} deleteNumber={deleteNumber} />)
    )
}

export default Numbers
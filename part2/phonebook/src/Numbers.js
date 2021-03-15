import React from 'react'

const Number = ({ person }) => {
    return (
        <div>
            {person.name} {person.number}
        </div>
    )
}

const Numbers = ({ personsToShow }) => {
    return (
        personsToShow.map(person => <Number key={person.name} person={person} />)
    )
}

export default Numbers
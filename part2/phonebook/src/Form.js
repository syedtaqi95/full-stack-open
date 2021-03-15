import React from 'react'

const Form = (props) => {
    return (
        <form onSubmit={props.addNumber}>
            <div>
                name: <input autoFocus value={props.newName} onChange={props.handleNewName} />
                <br />
          number: <input value={props.newNumber} onChange={props.handleNewNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form
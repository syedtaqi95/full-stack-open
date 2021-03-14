import React, { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Stat = ({text, state}) => {
  return (
    <p>{text} {state}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (newValue, stateUpdater) => () => stateUpdater(newValue)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={setToValue(good + 1, setGood)} text="good" />
      <Button handleClick={setToValue(neutral + 1, setNeutral)} text="neutral" />
      <Button handleClick={setToValue(bad + 1, setBad)} text="bad" />
      <Header text="statistics" />
      <Stat text="good" state={good} />
      <Stat text="neutral" state={neutral} />
      <Stat text="bad" state={bad} />
    </div>
  )
}

export default App
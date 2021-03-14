import React, { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const average = (a, b, c) => {
    const total = a + b + c;
    return (a - c) / total;
  }

  const positive = (a, b, c) => {
    const total = a + b + c;
    return (a / total * 100).toString() + " %"
  }

  if (good + neutral + bad === 0)
    return (
      <div>No feedback given</div>
    )

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good + neutral + bad} />
        <Statistic text="average" value={average(good, neutral, bad)} />
        <Statistic text="positive" value={positive(good, neutral, bad)} />
      </tbody>
    </table>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
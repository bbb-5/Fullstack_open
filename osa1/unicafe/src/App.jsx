import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ label, value }) => {
  return <p>{label} {value}</p>
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (100 * good) / total

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given yet!</p>
      </div>
    )
  } 

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine label={"Good"} value={good}/>
      <StatisticLine label={"Neutral"} value={neutral}/>
      <StatisticLine label={"Bad"} value={bad}/>
      <StatisticLine label={"All"} value={total}/>
      <StatisticLine label={"Average"} value={average}/>
      <StatisticLine label={"Positive"} value={positive}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>Give us feedback!</h1>
      <Button onClick={handleGood} text={"Good"}/>
      <Button onClick={handleNeutral} text={"Neutral"}/>
      <Button onClick={handleBad} text={"Bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Part = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      { parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = ({total}) => {
  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  )
}

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, current) => sum + current.exercises, 0)

  return (
    <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total total={total} />
    </>
  )
}

export default Course
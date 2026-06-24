const Header = ({course_name}) => {

  return (
    <>
      <h1>{course_name}</h1>
    </>
  )
}

const Part = ({part}) => {

  return (
    <>
      <p> {part.name} {part.exercises} </p>
    </>
  )

}

const Content = ({parts}) => {

  return (
    <>
      {parts.map(p => 
      <Part part={p} key={p.id}/>)}
    </>
  )

}


const Total = ({parts}) => {

  return (
    <>
      <p><b>Total of {parts.reduce((s,p) =>
      s + p.exercises,0)}</b></p>
    </>
  )

}

const Course = ({course}) => {

  return (
    <div>
      <Header course_name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App
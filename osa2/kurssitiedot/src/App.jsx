const Header = ({course_name}) => {

  return (
    <>
      <h2>{course_name}</h2>
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
      s + p.exercises,0)} exercises</b></p>
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
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <Course course={course} key={course.id}/>)}
    </div>
  )
}

export default App
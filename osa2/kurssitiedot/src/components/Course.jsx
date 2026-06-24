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


export default Course
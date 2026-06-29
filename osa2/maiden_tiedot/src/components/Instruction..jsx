const Instruction = ({ status }) => {
  if (status === false) {
    return null
  }

  return (
    <p>Too many matches, specify a little!</p>
  )
}

export default Instruction
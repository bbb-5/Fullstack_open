import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return

    } else {
      const new_person = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(new_person))
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = showAll
  ? persons
  : persons.filter(person => 
    person.name.toUpperCase().includes(newFilter.toUpperCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    
    if (event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilter={handleFilterChange}/>
      <h2>Add a new contact</h2>
      <PersonForm 
        addPerson={addPerson}
        handleName={handleNameChange}
        newName={newName}
        handleNumber={handleNumberChange}
        newNumber={newNumber}
        />
        <Persons persons={personsToShow}/>
    </div>
  )

}

export default App
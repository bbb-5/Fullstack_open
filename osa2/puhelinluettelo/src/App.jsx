import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [persons, setPersons] = useState([])


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)

      setNewName('')
      setNewNumber('')
      return

    } else {
      const new_person = {
        name: newName,
        number: newNumber
      }

      axios.post('http://localhost:3001/persons', new_person).then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
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
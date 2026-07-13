import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationStatus, setStatus] = useState('notification-success')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {

    event.preventDefault()

    if (newName === '') return

    const foundPerson = persons.find(p => p.name === newName)

    if (foundPerson) {

      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(foundPerson.id, {...foundPerson, number: newNumber})
        .then(()=> personService.getAll())
        .then((updatedPersons) => {
          setPersons(updatedPersons)
          showNotification(`${foundPerson.name}'s number changed to ${newNumber}`)
          setStatus('notification-success')
        }).catch(error => {
          showNotification(`Could not change ${foundPerson.name}'s number: ${error.response.data.error}`)
          setStatus('notification-error')
        })
        setNewName('')
        setNewNumber('')
        return
      }

    } else {
      const new_person = {
        name: newName,
        number: newNumber
      }

      personService
        .create(new_person)
        .then((returnedPerson) => {
          showNotification(`Added ${newName}`)
          setStatus('notification-success')
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('Error:', error.response.data)
          showNotification(`Could not add ${newName}: ${error.response.data.error}`)
          setStatus('notification-error')
        })
      }
  }

  const removePerson = (personToRemove) => {

    if (confirm(`Delete ${personToRemove.name}?`)) {
      personService
        .remove(personToRemove.id)
        .then(()=> personService.getAll())
        .then((updatedPersons) => {
          setPersons(updatedPersons)
          showNotification(`Deleted ${personToRemove.name}`)
          setStatus('notification-success')
        })
        .catch(error => {
          console.log('Error:', error.response.data)
          showNotification(`Could not remove ${personToRemove.name}: ${error.response.data.error}`)
          setStatus('notification-error')
        })
    }       
  }


  const personsToShow = showAll
  ? persons
  : persons.filter(person => 
    person.name.toUpperCase().includes(newFilter.toUpperCase()))

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

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
      <Notification message={notification} status={notificationStatus}/>
      <Filter filter={newFilter} handleFilter={handleFilterChange}/>
      <h2>Add a new contact</h2>
      <PersonForm 
        addPerson={addPerson}
        handleName={handleNameChange}
        newName={newName}
        handleNumber={handleNumberChange}
        newNumber={newNumber}
        />
        <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )

}

export default App
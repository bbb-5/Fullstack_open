import Person from './Person' 

const Persons = ({ persons, removePerson }) => {

return (
    <div>
        <h2>Numbers</h2>
        {persons.map((person) => (
        <Person key={person.id} person={person} 
        removePerson={() => removePerson(person)}/>))}
    </div>)
}

export default Persons
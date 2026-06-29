import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [newFilter, setFilter] = useState('')
  const [shownCountries, setShownCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then(response => {
        setShownCountries(response.data)
        setAllCountries(response.data)
      })
      .catch(error => {
        console.log('Error fetching countries:', error)
      })
  }, [])

  const handleFilterChange = (event) => {
    
    const new_filter = event.target.value
    setFilter(new_filter)

    const filtered = (allCountries.filter(country =>
      country.name.common.toUpperCase().includes(new_filter.toUpperCase())
    ))
    setShownCountries(filtered)
  }

  return (
    <div>
      <Filter filter={newFilter} handleFilter={handleFilterChange}/>
      <Countries countries={shownCountries}/>
    </div>
  )
}

export default App
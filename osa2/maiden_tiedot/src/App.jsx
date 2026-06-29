import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Countries from './components/Countries'
import Instruction from './components/Instruction.'
import Country from './components/Country'

const App = () => {
  const [newFilter, setFilter] = useState('')
  const [shownCountries, setShownCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [selected, setSelected] = useState(null)
  const [instStatus,setStatus] = useState(false)

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
    setSelected(null)

    const filtered = (allCountries.filter(country =>
      country.name.common.toUpperCase().includes(new_filter.toUpperCase())
    ))
    setShownCountries(filtered)

    if (filtered.length === 1){
      setSelected(filtered[0])
    }
    
    if (filtered.length >10){
      setStatus(true)
    } else {
      setStatus(false)
    }

  }

  const handleSelectCountry = (country) => {
    setSelected(country)
  }

  return (
    <div>
      <Filter filter={newFilter} handleFilter={handleFilterChange}/>
      <Instruction status={instStatus}/>
      <Countries countries={shownCountries} handleSelected={handleSelectCountry}/>
      <Country country={selected}/>
    </div>
  )
}

export default App
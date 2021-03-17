import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchBar = ({ filterName, handleFilterName }) => (
    <div>
      find countries <input value={filterName} onChange={handleFilterName} />
    </div>
)

const CountryInfo = ({country}) => {
  if (Object.entries(country).length === 0)
    return (<></>)
  else {
    return (
      <div>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
        {country.languages.map((lang) =>          
          <li key={lang.name}>{lang.name}</li>
        )}
        </ul>
        <img src={country.flag} alt={country.name} width={150} />
      </div>
    )
  }  
}

const SearchResult = ({ filteredCountries, setDisplayedCountry }) => {

  const handleShowCountry = (e) => {
    e.preventDefault()
    const country = filteredCountries.filter((c) => c.name === e.target.firstChild.data)[0]
    setDisplayedCountry(country)
  }

  if (filteredCountries.length > 10) {
    return (
      <div>Too many countries, specify another filter</div>
    )
  }
  else if (filteredCountries.length === 1) {
    setDisplayedCountry(filteredCountries[0])
    return <></>
  }
  else if (filteredCountries.length === 0) {
    return (
      <div>Type a country's name</div>
    )
  }
  else {
    return (
      filteredCountries.map((country) => {
        return (
          <form key={country.name} onSubmit={handleShowCountry}>
            {country.name} 
            <button>show</button>
          </form>
        )
      })
    )
  }
}

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [filterName, setFilterName] = useState('')
  const [displayedCountry, setDisplayedCountry] = useState({})

  const effectHook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountryList(res.data))
  }
  useEffect(effectHook, [])

  const handleFilterName = (e) => setFilterName(e.target.value)

  const filteredCountries = (filterName === '')
    ? []
    : countryList.filter((country) => {
      const countryLower = country.name.toLowerCase()
      const filterLower = filterName.toLowerCase()
      return countryLower.includes(filterLower)
    })

  return (
    <div>
      <SearchBar filterName={filterName} handleFilterName={handleFilterName} />
      <SearchResult filteredCountries={filteredCountries} 
        setDisplayedCountry={setDisplayedCountry}/>
      <CountryInfo country={displayedCountry} />
    </div>
  );
}

export default App;

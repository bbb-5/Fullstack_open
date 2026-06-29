const Country = ({country}) => {

    if (country === null) {
        return null
      }

        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital - {country.capital}</p>
                <p>Area - {country.area}</p>
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map(lang =>
                    <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png} height={200} width={250}></img>
            </div>
        )
}

export default Country
import Weather from "./Weather"

const Country = ({country}) => {

    if (country === null) {
        return null
    }

        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital - {country.capital}</p>
                <p>Area - {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(lang =>
                    <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png} height={200} width={250}></img>
                <Weather country={country}/>
            </div>
        )
}

export default Country
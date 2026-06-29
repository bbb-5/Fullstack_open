const Countries = ({countries, handleSelected}) => {

    
    if (countries.length === 1) {
        return (
            null
        )
    }

    if (countries.length <= 10) {
        return (
            <div>
                <ul>
                    {countries.map(country =>
                        <li key={country.name.common}>{country.name.common}
                        <button onClick={() => handleSelected(country)}>Show</button></li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Countries
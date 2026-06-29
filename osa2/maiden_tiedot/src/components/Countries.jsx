import Country from "./Country";

const Countries = ({countries}) => {

    if (countries.length === 1) {
        return (
            <Country country={countries[0]}/>
        )
    }

    if (countries.length <= 10) {
        return (
            <div>
                    {countries.map(country =>
                        <p key={country.name.common}>{country.name.common}</p>
                    )}
            </div>
        )
    } else {
        return (
            <p>Too many matches, specify filter!</p>
        )
    }
}

export default Countries
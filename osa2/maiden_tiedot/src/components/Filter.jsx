const Filter = ({ filter, handleFilter }) => {
    return <div> Find countries: 
        <input value={filter} onChange={handleFilter}/></div>
}

export default Filter
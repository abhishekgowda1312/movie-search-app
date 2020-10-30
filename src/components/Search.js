import React from 'react'

function Search( {handleInput, search, onSelect} ) {
    return (
        <section>
            <input type="text" placeholder="Search for a movie..." className="searchBox" onChange={handleInput}/>
            <select className="selectBox" onChange={onSelect}>
                <option></option>
                <option>movie</option>
                <option>series</option>
                <option>episodes</option>
            </select>
            <button className="search" onClick={search}>Search</button>
        </section>
    )
}

export default Search

import React from 'react'
import Result from './Result'

function Results( { results, openPopup, toggleFavAction} ) {
    
    return (
        <section className="results">
           {results.map(result => <Result key={result.imdbID} result={result} openPopup={openPopup} toggleFavAction={toggleFavAction}/>)}
        </section>
    )
}

export default Results

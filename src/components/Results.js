import React from 'react'
import Result from './Result'

function Results( { results, openPopup, onFavClick } ) {
    
    return (
        <section className="results">
           {results.map(result => <Result result={result} onFavClick={onFavClick}/>)}
        </section>
    )
}

export default Results

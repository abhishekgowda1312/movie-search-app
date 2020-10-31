import React from 'react'

function Result( {result, openPopup, toggleFavAction} ) {

    return (
        <div className="result">
            <img alt="imageH" src={result.Poster} onClick={() => openPopup(result.imdbID)}/>
            <h3>{result.Title} <button type="button" onClick={() => toggleFavAction(result.imdbID)}>fav</button></h3>
            <h6>Release date: {result.Year}</h6>
        </div>
    )
}

export default Result

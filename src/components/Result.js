import React from 'react'

function Result( {result, onFavClick} ) {
    return (
        <div className="result">
            <img alt="imageH" src={result.Poster}/>
            <h3>{result.Title} <button onClick={onFavClick}>fav</button></h3>
            
        </div>
    )
}

export default Result

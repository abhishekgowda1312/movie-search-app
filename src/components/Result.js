import React from 'react'

function Result( {result} ) {
    console.log(result)
    return (
        <div className="result">
            <img alt="imageH" src={result.Poster}/>
            <h3>{result.Title} <button>fav</button></h3>
            <h6>Release date: {result.Year}</h6>
        </div>
    )
}

export default Result

import React from 'react'
import Favorite from './Favorite'


function Favorites( { favorites, openPopup, toggleFavAction }) {
    
    return (        
        <div id="favs1" className="none">            
            {(favorites.length > 0) ?<span className="favs">Favorites</span>: null }
            <section className="results">
           {favorites.map(result => <Favorite key={result.imdbID} result={result} openPopup={openPopup} toggleFavAction={toggleFavAction}/>)}
        </section>
        </div>
    )
}

export default Favorites

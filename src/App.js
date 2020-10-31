import React from 'react'
import './App.css';
import { useState , useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'
import Favorites from './components/Favorites'

function App() {
  //getting the initial list of favorites from local storage
  const initialFav = JSON.parse(window.localStorage.getItem('favorites') || "[]")
  const [state,setState] = useState({
    s: "", //search string
    type: "", //genre type
    results: [], //results with the search string
    selected: {}, //selected item for detailed view
    favorites: initialFav //favorites selected
  })
  const apiUrl = "http://www.omdbapi.com/?apikey=15757ea0"
  
  //lifecycle hook
  useEffect(() => {
    window.localStorage.setItem('favorites', JSON.stringify(state.favorites)  )
  }, [state.favorites] )


  //to get the input string
  const handleInput = (e) => {
    let s = e.target.value

    setState(prevState => {
      return{...prevState,s:s}
    })
  }

  //dropdown select option
  const onSelect = (e) => {
    let select = e.target.value
    
    setState(prevState => {
      return {...prevState, type: select}
    })
  }  
  
  //search with the fields gathered
  const search = () => {    
   axios(apiUrl + "&s=" +state.s+ "&type=" +state.type).then(({data}) =>{         
       let results = data.Search;
        

       if(results !== undefined){
       setState(prevState => {
           return {...prevState, results: results}
       })
      }else{
        alert('No matching criteria found')
        
      }

    }).catch(err => {
      
    })    
   }

  //toggle action for set as fav button
  const toggleFavAction = id => {
    axios(apiUrl + "&i=" +id).then(({data}) =>{         
      let results = data;
      
      const found = state.favorites.find(element => element.imdbID === results.imdbID)
      
      if(found === undefined){
        setState(prevState => {
              return {...prevState, favorites: [...state.favorites, results]}
          })
      }
      else {
        var array = [...state.favorites]
        var index = array.filter( element => 
          element.imdbID !== results.imdbID
        )
        
        if( found !== -1){
          
          setState(prevState => {
            return {...prevState, favorites: index}
        })
        }       
      }
   })
  }

 //open a detailed page with the corresponding movie
  const openPopup = id => {
    axios(apiUrl + "&i=" +id).then(({data}) =>{         
      let results = data;
        
      setState(prevState => {
          return {...prevState, selected: results}
      })
   })
  }

  //open the list of favorite items
  const openFavorite = () => {
    let a = document.getElementById("favs1")
    if (a.style.display === 'none') {
      a.style.display = 'block';
    } else {
      a.style.display = 'none';
    }
    
  }

  //close detailed popup
  const closePopup = () => {
    setState(prevState => {
      return{ ...prevState, selected: {}}
    })
  }

  return (
  
    <div>
      <nav>
        <span>Home</span>
        <span onClick={() => openFavorite()}>Favorites</span>      
      </nav>
      <Favorites favorites={state.favorites} openPopup={openPopup} toggleFavAction={toggleFavAction}/>
      <hr/>
      <header >
        <h2>Movie Database</h2>
        {/* create a search component */}
        <Search handleInput={handleInput} search={search} onSelect={onSelect}/>
        {/* create a results component */}
        <Results results={state.results} openPopup={openPopup} toggleFavAction={toggleFavAction} />
        {( typeof state.selected.Title != "undefined")? <Popup selected={state.selected} closePopup={closePopup}/>: false}
      </header>
    </div>
  
  );
}

export default App;

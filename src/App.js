import './App.css';
import { useState } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'

function App() {
  const [state,setState] = useState({
    s: "", //search string
    type: "", //genre type
    results: [], //results with the search string
    selected: {},
    favorites: [] //favorites selected
  })
  const apiUrl = "http://www.omdbapi.com/?apikey=15757ea0"

  const handleInput = (e) => {
    let s = e.target.value

    setState(prevState => {
      return{...prevState,s:s}
    })
  }
  const onSelect = (e) => {
    let select = e.target.value
    
    setState(prevState => {
      return {...prevState, type: select}
    })
  }
  const onFavClick = (id) => {
    axios(apiUrl + "&i=" +id).then(({data}) =>{         
      let results = data;
      console.log(results)

    setState(prevState => {
      return {...prevState, favorites:results}
    })
    })
}

  const search = () => {    
   axios(apiUrl + "&s=" +state.s+ "&type=" +state.type).then(({data}) =>{         
       let results = data.Search;
         
       setState(prevState => {
           return {...prevState, results: results}
       })
    })    
   }

  const openPopup = id => {
    axios(apiUrl + "&i=" +id).then(({data}) =>{         
      let results = data;
        
      setState(prevState => {
          return {...prevState, selected: results}
      })
   })
  }


  return (
    <div className="App">
      <nav>
        <span>Home</span>
        <span>Favorites</span>        
      </nav>
      <hr/>
      <header >
        <h2>Movie Database</h2>
        {/* create a search component */}
        <Search handleInput={handleInput} search={search} onSelect={onSelect}/>
        {/* create a results component */}
        <Results results={state.results} openPopup={openPopup} onFavClick={onFavClick}/>
      </header>
    </div>
  );
}

export default App;

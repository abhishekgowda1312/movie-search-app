import './App.css';
import { useState } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

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
      console.log(err)
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
  const closePopup = () => {
    setState(prevState => {
      return{ ...prevState, selected: {}}
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
        <Results results={state.results} openPopup={openPopup}  />
        {( typeof state.selected.Title != "undefined")? <Popup selected={state.selected} closePopup={closePopup}/>: false}
      </header>
    </div>
  );
}

export default App;

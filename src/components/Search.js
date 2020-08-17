import React, { useContext } from 'react';
import { AppContext } from './App';
import '../styles/Search.css';

function Search() {
  const {state = {}, dispatch} = useContext(AppContext);
  const handleSearch = (searchText = "") => {
    console.log(searchText.trim());
    dispatch({ type: 'SEARCH_EVENTS', data: searchText.trim() });
  };
  return (
    <input 
      type="search" 
      className="search-input" 
      placeholder="SEARCH EVENTS" 
      aria-role="searchbox"
      onChange={e => handleSearch(e.target.value)} value={state.searchText} />
  );
}

export default Search;
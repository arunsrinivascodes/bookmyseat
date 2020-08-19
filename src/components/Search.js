import React, { useContext, useEffect } from 'react';
import { AppContext } from './App';
import '../styles/Search.css';

function Search() {
  const {state = {}, dispatch} = useContext(AppContext);
  useEffect(() => {
    document.title = "Book My Seat - All Events";
  }, []);
  const handleSearch = (searchText = "") => {
    dispatch({ type: 'SEARCH_EVENTS', data: searchText });
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
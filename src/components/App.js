import React, { useReducer, createContext } from 'react';
import '../styles/App.css';
import Events from './Events';
import Search from './Search';
import Footer from './Footer';
import Alert from './Alert';

export const AppContext = createContext();

const initialState = {
  searchText: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_EVENTS':
      return {
        searchText: action.data
      };
    default:
      return state;
  }
}

function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        <Alert />
        <Search />
        <Events />
      </AppContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
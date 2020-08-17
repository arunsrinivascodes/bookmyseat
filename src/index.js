import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import Booking from './components/Booking';
import NotFound from './components/NotFound';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

const routes = (
  <BrowserRouter>
    <Switch>
      <Route 
        exact 
        path="/" 
        component={App}
      />
      <Route 
        exact 
        path="/booking/:eventID" 
        component={Booking}
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    {routes}
  </React.StrictMode>,
  document.getElementById('root')
);
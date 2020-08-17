import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Event from './Event';
import Loader from './Loader';
// import eventsData from '../data/events';
import { AppContext } from './App';
import '../styles/Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {state, dispatch} = useContext(AppContext);
  const [apiCall, triggerApiCall] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/events').then(res => {
      if(res && res.status === 200 && res.data) {
        setEvents(res.data);
        localStorage.setItem('events', JSON.stringify(res.data));
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [apiCall]);

  useEffect(() => {
    setLoading(true);
    console.log(state, state.searchText, "events file");
    console.log(events);
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    console.log(allEvents);
    if(state.searchText) {
      const filteredEvents = allEvents.filter(event => {
        return event.name.toLowerCase().includes(state.searchText.toLowerCase());
      });
      setEvents(filteredEvents);
      setLoading(false);
    } else {
      if(localStorage.getItem('events')) {
        setEvents(allEvents);
        setLoading(false);
      } else {
        triggerApiCall(!apiCall);
      }
    }
  }, [state]);

  return (
    <section className="container">
      {isLoading && <Loader />}
      <section className="events">
        {events && events.length > 0 && events.map((event) => {
          return <Event key={event._id} data={event} />
        })}

        {!isLoading && events && events.length === 0 && <h2>No events available. Please try again.</h2>}
      </section>
    </section>
  );
}

export default Events;
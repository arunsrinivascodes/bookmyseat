import React from 'react';
import { Link } from 'react-router-dom';

function formatDate(setDate) {
  if(setDate) {
    const eventDate = new Date(setDate);
    const date = eventDate.getDate() + '';
    const month = eventDate.getMonth();
    const year = eventDate.getFullYear() + '';
    const formattedDate =  date.length === 1 ? `0${date}` : date;
    // const formattedMonth =  (month+1).length === 1 ? `0${month}` : month;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${formattedDate} ${months[month]} ${year}`;
  }
}
function Event({ data }) {
  const { name, eventImage, eventDate, availableSeatCount, _id } = data;
  return (
    <section className="event">
      <h3 tabIndex="0" aria-label={name} role="heading">{name}</h3>
      <section className="event-block">
        <img src={eventImage} alt={name} />
        <section className="event-details" role="button">
          <div 
            tabIndex="0" 
            className="event-date" 
            aria-label={`Event is on ${formatDate(eventDate)}`}>
              {formatDate(eventDate)}
          </div>
          <div 
            tabIndex="0"
            aria-label={availableSeatCount === 0 ? "Sorry, no seats available" : `${availableSeatCount} seats available to book`}
            className={availableSeatCount > 50 ? "seats available-high" : (availableSeatCount > 0 ? "seats available-medium" : "seats unavailable")}>
              Seats Available: <span className="seats-count">{availableSeatCount}</span>
          </div>
          <button 
            aria-label={availableSeatCount === 0 ? "Sold Out" : "Book Now"}
            className={availableSeatCount === 0 ? "event-cta" : "event-cta cursorPointer"} 
            disabled={availableSeatCount === 0}>
              {availableSeatCount > 0 ? (<Link to={`/booking/${_id}`} tabIndex="-1">
                Book Now
              </Link>) : "Sold Out"}
          </button>
        </section>
      </section>
    </section>
  );
}

export default Event;
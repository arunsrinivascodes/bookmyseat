import React, { useState, useCallback, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loader from './Loader';
import Alert from './Alert';
import '../styles/Booking.css';

function Booking({ match }) {
  const { register, handleSubmit, errors } = useForm();
  const [event, setEvent] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const eventID = match.params.eventID;

  const handleSeatSelection = useCallback((event) => {
    let numOfSeats = +event.target.value;
    const attendeesData = [];
    if(numOfSeats > 1) {
      while(numOfSeats > 1) {
        const key = `attendee${numOfSeats}`;
        const existingVal = attendees.find(data => data[key]);
        attendeesData.push({ [key]: ((existingVal && existingVal[key]) || "") });
        numOfSeats--;
      }
      setAttendees(attendeesData);
    } else if(numOfSeats === 1) {
      setAttendees([]);
    }
  }, [attendees]);

  const handleAttendeesInput = useCallback((event) => {
    const nameAttribute = event.target.getAttribute('name');
    const inputValue = event.target.value.trim();
    const prevAttendees = [...attendees];
    const attendeesList = prevAttendees.map(data => {
      if(nameAttribute in data) {
        return { [nameAttribute] : inputValue};
      }
      return data;
    });
    setAttendees(attendeesList);
  });


  const onSubmit = data => {
    setAttendees(attendees);
    const { name, email, phone, noOfSeats } = data;
    const body = {
      name, 
      email,
      phone,
      noOfSeats,
      eventID: match.params.eventID,
    };
    if(attendees && attendees.length > 0) {
      body.attendees = attendees;
    }
    axios.post('http://localhost:5000/booking', body).then(data => {
      if(data.status === 200 && data.data) {
        sessionStorage.setItem('success', 'true');
        setRedirect('/');
      }
    }).catch(err => {
      sessionStorage.setItem('success', 'false');
      setRedirect('/');
    });
  }

  useState(() => {
    sessionStorage.removeItem("success");
    axios.get(`http://localhost:5000/events/${eventID}`).then(res => {
      setEvent(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    })
  }, []);

  if(redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <Fragment>
      {isLoading && <Loader />}

      {!isLoading && !event && <Alert response="false" message="Error fetching details. Please try again" />}

      {!isLoading && event && (
        <section className="container">
          <h2 className="event-heading" tabIndex="0" aria-label={`Book for ${event.name} event`}>{event.name}</h2>
          <p className="event-seats" tabIndex="0" aria-label={`${event.availableSeatCount} tickets available`}>Number of available seats: <span className="available-seats">{event.availableSeatCount}</span></p>
          <section className="booking-details">
            <section className="image-block">
              <img className="event-image" src={event.eventImage} alt={event.name} />
            </section>
            <section className="booking-form">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <section className="form-group">
                  <label>Name:</label>
                  <section className="input-group">
                    <input 
                      type="text" 
                      placeholder="Ex: Arun" 
                      name="name"
                      aria-label="Enter your name"
                      ref={register({ 
                        required: true, 
                        validate: value => {
                          const str = value.replace(new RegExp(' ', 'g'), '');
                          return str.match(/^[A-Za-z]+$/) !== null;
                        }
                      })} />
                      {errors.name?.type === "required" &&
                        <p className="error-message">Please enter your name</p>}
                      {errors.name?.type === "validate" &&
                        <p className="error-message">Only letters and spaces are allowed</p>}
                  </section>
                </section>
                <section className="form-group">
                  <label>Email:</label>
                  <section className="input-group">
                    <input 
                      type="email" 
                      placeholder="Ex: arun@gmail.com" 
                      name="email"
                      aria-label="Enter your email"
                      ref={register({ 
                        required: true, 
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                        {errors.email?.type === "required" &&
                          <p className="error-message">Email is required</p>}
                        {errors.email?.type === "pattern" &&
                          <p className="error-message">Invalid email</p>}
                  </section>
                </section>
                <section className="form-group">
                  <label>Phone No:</label>
                  <section className="input-group">
                  <input 
                    type="tel" 
                    placeholder="Ex: 7904741671" 
                    name="phone"
                    aria-label="Enter your phone number"
                    ref={register({ 
                        required: true, 
                        validate: value => {
                          return value.length === 10 && value.match(/^[0-9]+$/) !== null;
                        }
                    })} />
                    {errors.phone?.type === "required" &&
                      <p className="error-message">Phone is required</p>}
                    {errors.phone?.type === "validate" &&
                      <p className="error-message">Invalid mobile</p>}
                  </section>
                </section>
                <section className="form-group">
                  <label>Number of seats:</label>
                  <section className="input-group">
                    <select 
                      name="noOfSeats"
                      defaultValue=""
                      onChange={handleSeatSelection}
                      aria-label="Select the number of seats"
                      ref={register({ 
                        required: true,
                        validate: value => {
                          return event.availableSeatCount >= +value;
                        }
                      })}>
                      <option disabled value="">Please select seats</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                    {errors.noOfSeats?.type === "required" &&
                      <p className="error-message">Number of seats is required</p>}
                    {errors.noOfSeats?.type === "validate" &&
                      <p className="error-message">{`Only ${event.availableSeatCount} seats available`}</p>}
                  </section>
                </section>
                {attendees && attendees.length > 0 && attendees.map((data, index) => {
                  const selector = `attendee${index+2}`;
                  return (
                    <section className="form-group" key={index}>
                      <label>{`Name of Attendee ${index+2}:`}</label>
                      <section className="input-group">
                        <input 
                          type="text"
                          name={selector}
                          aria-label={`Enter the name of Attendee #${index+2}`}
                          placeholder="Ex: Ron"
                          onChange={handleAttendeesInput}
                          value={data[`attendee${index+2}`]}
                          ref={register({ 
                            required: true,
                            validate: value => {
                              const str = value.replace(new RegExp(' ', 'g'), '');
                              return str.match(/^[A-Za-z]+$/) !== null;
                            }
                          })} />
                        {errors[selector] && errors[selector]['type'] === "required" &&
                          <p className="error-message">{`Please enter the name of Attendee #${index+2}`}</p>}
                        {errors[selector] && errors[selector]['type'] === "validate" &&
                          <p className="error-message">Only letters and spaces are allowed</p>}
                      </section>
                    </section>
                  );
                })}
                {/* <section className="form-group">
                  <label>Name of Attendee 2:</label>
                  <input type="text" placeholder="Ex: Ron" />
                </section> */}

                <section className="booking-btn-group">
                  <button 
                    type="submit" 
                    className={event && event.availableSeatCount === 0 ? "book-tickets-cta disabled-cta" : "book-tickets-cta"} 
                    disabled={event && event.availableSeatCount === 0}
                    aria-label={event && event.availableSeatCount === 0 ? "Sorry, no seats available" : "Book Now"}>
                      Submit
                  </button>
                  <button type="submit" className="cancel-booking-cta" aria-label="Cancel booking">
                    <Link to="/" tabIndex="-1">Cancel</Link>
                  </button>
                </section>
              </form>
            </section>
          </section>
        </section>
      )}
    </Fragment>
  );
}

export default Booking;
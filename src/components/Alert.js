import React from 'react';
import '../styles/Alert.css';

function Alert({ response = null, message = '' }) {
  const result = response || sessionStorage.getItem('success');
  const msg = message || (result === 'true' ? 'Seats successfully reserved' : 'Seat booking failed');
  if(!result) return null;
  if(result) {
    sessionStorage.removeItem('success');
    return (
      <section className={result === 'true' ? 'alert-container' : 'alert-container err-block'}>
        <p>{msg}</p>
      </section>
    );
  }
}

export default Alert;
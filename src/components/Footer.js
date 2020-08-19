import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="page-footer">
      <h4>Developed by Arun Srinivas</h4>
      <section className="links">
        <a href="mailto:arunsrinivas10@yahoo.com" target="_blank" rel="noopener noreferrer">Email me</a>
        <a href="tel:+91-8838021187" rel="noopener noreferrer" target="_blank">Call me</a>
      </section>
    </footer>
  );
}

export default Footer;
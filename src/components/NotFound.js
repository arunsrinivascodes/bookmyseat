import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (<h2>Page Not Found. <Link to="/">Go to home.</Link></h2>);
}

export default NotFound;
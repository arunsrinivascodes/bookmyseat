const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const { connect } = require('mongoose');
const connectDB = require('./config/db');

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../build')))

app.get('/', (req, res) => res.send('API response'));
// connect DB
connectDB();

app.use('/events', require('./api/events'));
app.use('/booking', require('./api/booking'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
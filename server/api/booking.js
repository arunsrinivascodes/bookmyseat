const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.send('bookings api');
});

router.post('/', [
  body('name')
    .notEmpty()
    .isAlpha()
    .withMessage('Must be only alphabetical characters'),
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Invalid email address'),
  body('phone')
    .notEmpty()
    .isInt()
    .isLength({ min: 10, max: 10 })
    .withMessage('Not a valid phone number'),
  body('noOfSeats').notEmpty().isNumeric({ min: 1 }),
  body('attendees').optional().isArray().withMessage("Must be an array of objects"),
  body('eventID').notEmpty()
  ], async (req, res) => {
    const validationRes = validationResult(req);
    const { errors = [] } = validationRes;
    if(validationRes && errors.length > 0) {
      res.status(422).json({ errors });
    }
    if(validationRes && errors.length === 0) {
      const { name, email, phone, noOfSeats, eventID, attendees = [] } = req.body || {};
      const bookingObj = {};
      if(name) bookingObj.name = name;
      if(email) bookingObj.email = email;
      if(phone) bookingObj.phone = phone;
      if(noOfSeats) bookingObj.noOfSeats = noOfSeats;
      if(eventID) bookingObj.eventID = eventID;
      if(attendees && attendees.length > 0) bookingObj.attendees = attendees;
      try {
        // save the booking details in booking doc
        const booking = new Booking(bookingObj);
        await booking.save();
        // update seat count in event doc
        try {
          let eventDetails = await Event.findById(req.body.eventID);
          eventDetails.availableSeatCount = eventDetails.availableSeatCount - parseInt(req.body.noOfSeats);
          eventDetails.save();
          res.json(booking);
        } catch(err) {
          console.error(err.message);
          res.status(500).send('server error');
        }
      } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
      }
    }
  }
);

module.exports = router;
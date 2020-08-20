const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    if(!events || (events && Array.isArray(events) && events.length === 0)) {
      res.status(400).json({ msg: 'No events found' });
    }
    res.json(events);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// Find an event based on Event ID and return the event data
router.get('/:eventID', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventID);
    if(!event) {
      res.status(400).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

router.post('/', [
    body('name')
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage('Must be minimum of 2 characters'),
    body('eventImage')
      .notEmpty()
      .isURL({ protocols: ['http', 'https'] })
      .withMessage('Enter a valid image URL'),
    body('eventDate')
      .notEmpty()
      .isDate({ format: 'YYYY-MM-DD'})
      .withMessage('Please enter the date in YYYY-MM-DD format'),
    body('availableSeatCount').notEmpty().isNumeric({ min: 1 })
  ], async (req, res) => {
    const validationRes = validationResult(req);
    const { errors = [] } = validationRes;
    if(validationRes && errors.length > 0) {
      res.status(422).json({ errors });
    }
    if(validationRes && errors.length === 0) {
      const { name, eventImage, eventDate, availableSeatCount } = req.body || {};
      const eventObj = {};
      if(name) eventObj.name = name;
      if(eventImage) eventObj.eventImage = eventImage;
      if(eventDate) eventObj.eventDate = eventDate;
      if(availableSeatCount) eventObj.availableSeatCount = availableSeatCount;
      try {
        const event = new Event(eventObj);
        await event.save();
        res.json(event);
      } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
      }
    }
});

module.exports = router;
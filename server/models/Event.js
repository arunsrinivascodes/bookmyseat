const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  eventImage: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  availableSeatCount: {
    type: Number,
    required: true
  }
});

module.exports = Event = mongoose.model('event', EventSchema);
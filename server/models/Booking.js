const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  eventID: {
    type: Schema.Types.ObjectId,
    ref: 'event',
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  noOfSeats: {
    type: Number,
    required: true
  },
  attendees: {
    type: [Object],
    required: false
  }
});

module.exports = Booking = mongoose.model('booking', BookingSchema);
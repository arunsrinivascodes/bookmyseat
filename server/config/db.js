const mongoose = require('mongoose');
const mongoURI = require('./config').mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('connected to mongo db');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

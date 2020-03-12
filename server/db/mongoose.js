const mongoose = require('mongoose');

const options = {
  useUnifiedTopology: true, // use new Server Discover and Monitoring engine - 03/11/2020
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  // The next two options have been deprecated for lastest MongoDB  - 03/11/2020
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections

  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});
mongoose.connect(process.env.MONGODB_URI, options); // Mongoose version 5 requirement

module.exports = { mongoose };
 
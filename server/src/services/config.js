const keys = require('../config/keys');
require('dotenv').config();

const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  google: {
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: '/auth/google/callback'
  },
  mongoURI: keys.mongoURI,
  cookieKey: keys.cookieKey
};

module.exports = config;

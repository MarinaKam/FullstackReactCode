const dotenv = require('dotenv');

dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  mongoURI: `mongodb+srv://dbEmaily:${process.env.MONGO_PSW}@emaily.udral.mongodb.net/${process.env.MONGO_USER}?retryWrites=true&w=majority`,
  cookieKey: process.env.COOKIE_KEY
};

module.exports = config;

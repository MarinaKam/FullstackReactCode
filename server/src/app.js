const express = require('express');
const passport = require('passport');
// const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = require('./services/config');

// const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');
// const PUBLIC_PATH = path.join(__dirname, '../public');
const app = express();

passport.use(new GoogleStrategy(config.google, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('profile', profile);
}));

app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});

app.get('/auth/google', passport.authenticate('google', {
  scope: [ 'profile', 'email' ]
}));

app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(config.PORT, () => {
 console.log(`App is running at http://localhost:${config.PORT} in ${config.NODE_ENV} mode`);
});

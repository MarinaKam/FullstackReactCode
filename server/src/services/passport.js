const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const config = require('./config');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(new GoogleStrategy(config.google, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id }).then((existingUser) => {
    existingUser
      ? done(null, existingUser)
      : new User({ googleID: profile.id }).save().then((user) => done(null, user));
  });
}));

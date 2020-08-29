const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: [ 'profile', 'email' ]
  }));

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/', (req, res) => {
    res.send('hello from the other side');
  });
};

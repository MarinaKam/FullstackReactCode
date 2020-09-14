const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./services/config');
require('./models/User');
require('./services/passport');

// const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');
// const PUBLIC_PATH = path.join(__dirname, '../public');
const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [ config.cookieKey ]
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(PUBLIC_PATH));
// app.use(express.static(CLIENT_BUILD_PATH));

mongoose
  .connect(config.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
   console.log(`DB connection error: ${err.message}`);
  });

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

app.listen(config.PORT, () => {
 console.log(`App is running at http://localhost:${config.PORT} in ${config.NODE_ENV} mode`);
});

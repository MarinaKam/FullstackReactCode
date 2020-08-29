const express = require('express');
const mongoose = require('mongoose');
const config = require('./services/config');
require('./services/passport');
require('./models/User');

// const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');
// const PUBLIC_PATH = path.join(__dirname, '../public');
const app = express();

mongoose
  .connect(config.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
   console.log(`DB connection error: ${err.message}`);
  });

require('./routes/authRoutes')(app);

app.listen(config.PORT, () => {
 console.log(`App is running at http://localhost:${config.PORT} in ${config.NODE_ENV} mode`);
});

const express = require('express');
const path = require('path');

const config = require('./services/config');

// const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');
const PUBLIC_PATH = path.join(__dirname, '../public');
const app = express();

// app.use(morgan);

app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});

app.listen(config.PORT, () => {
 console.log(`App is running at http://localhost:${config.PORT} in ${config.NODE_ENV} mode`);
});

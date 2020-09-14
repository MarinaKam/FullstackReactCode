const config = require('../services/config');
const stripe = require('stripe')(config.stripe.stripeSecretKey);

module.exports = (app) => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5$ for 5 credits',
      source: req.body.id
    });

    console.log(charge);
  });
};

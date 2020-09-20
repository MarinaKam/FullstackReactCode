import mongoose from 'mongoose';
import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';
import surveyTemplate from '../services/emailTemplates/surveyTemplate';
import Mailer from '../services/Mailer';

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/response', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.get('/api/surveys', (req, res) => {
    res.send('Surveys');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients,
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

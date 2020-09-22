import mongoose from 'mongoose';
import { Path } from 'path-parser';
import { URL } from 'url';
import { compact, uniqBy } from 'lodash';
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

  app.post('/api/surveys/webhooks', (req, res) => {
    const events = req.body.map(({ email, url }) => {
      const pathname = new URL(url).pathname;
      const path = new Path('/api/surveys/:surveyID/:choice');
      const match = path.test(pathname);

      console.log(email);
      console.log(match);
      if (match) {
        return {
          email,
          surveyID: match.surveyID,
          choice: match.choice
        };
      }
    });

    const compactEvents = compact(events);
    const uniqueEvents = uniqBy(compactEvents, 'email', 'surveyID');

    console.log(uniqueEvents);
    res.send({});
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

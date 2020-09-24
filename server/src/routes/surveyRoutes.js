import mongoose from 'mongoose';
import { Path } from 'path-parser';
import { URL } from 'url';
import { chain } from 'lodash';
import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';
import surveyTemplate from '../services/emailTemplates/surveyTemplate';
import Mailer from '../services/Mailer';

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/:surveyID/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    try {
      const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });

      res.send(surveys);
    } catch (err) {
      res.status(401).send(err);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const path = new Path('/api/surveys/:surveyID/:choice');

    chain(req.body).map(({ email,url }) => {
      const match = path.test(new URL(url).pathname);

      return match && {
        email,
        surveyID: match.surveyID,
        choice: match.choice
      };
    }).compact().uniqBy('email', 'surveyID').each(({ surveyID, email, choice }) => {
      Survey.updateOne({
        _id: surveyID,
        recipients: {
          $elemMatch: { email, responded: false }
        }
      }, {
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date()
      }).exec()
    }).value();

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

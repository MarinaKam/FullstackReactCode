import sendgrid from 'sendgrid';
import config from '../services/config';

const helper = sendgrid.mail;

export default class Mailer extends helper.Mail {
  constructor({ subject, recipients }, template) {
    super();

    this.sgApi = sendgrid(config.sendGrid.sendGridKey)
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', template);
    this.recipients = this.formatAddresses(recipients);

    //from helper.Mail
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients?.map(({ email }) => new helper.Email(email));
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    //from helper.Mail
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => personalize.addTo(recipient));
    //from helper.Mail
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    return await this.sgApi.API(request);
  }
}

// module.exports = Mailer;
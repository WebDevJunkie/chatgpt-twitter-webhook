require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  // Extract the retweet event from the request body
  const retweetEvent = req.body.retweet_event;

  // Check if the retweet event is for one of your tweets
  if (retweetEvent.user.screen_name === process.env.TWITTER_HANDLE) {
    // Send a text message to your phone
    request.post(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      auth: {
        user: process.env.TWILIO_ACCOUNT_SID,
        pass: process.env.TWILIO_AUTH_TOKEN
      },
      form: {
        From: process.env.TWILIO_PHONE_NUMBER,
        To: process.env.PHONE_NUMBER,
        Body: 'Someone just retweeted one of your tweets!'
      }
    }, (error, response, body) => {
      if (error) {
        console.error(error);
      } else {
        console.log(response.statusCode, body);
      }
    });
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Webhook listening on port 3000');
});

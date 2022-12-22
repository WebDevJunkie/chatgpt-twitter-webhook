const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  // Extract the retweet event from the request body
  const retweetEvent = req.body.retweet_event;

  // Check if the retweet event is for one of your tweets
  if (retweetEvent.user.screen_name === 'your_twitter_handle') {
    // Send a text message to your phone
    request.post('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
      auth: {
        user: 'YOUR_ACCOUNT_SID',
        pass: 'YOUR_AUTH_TOKEN'
      },
      form: {
        From: 'YOUR_TWILIO_PHONE_NUMBER',
        To: 'YOUR_PHONE_NUMBER',
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

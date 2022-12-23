const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  // Extract the retweet event from the request body
  const retweetEvent = req.body.retweet_event;

  // Check if the retweet event is for one of your tweets
  if (retweetEvent.user.screen_name === process.env.TWITTER_HANDLE) {
    // Play a sound file on your Raspberry Pi
    exec('omxplayer /path/to/sound/file.mp3', (error, stdout, stderr) => {
      if (error) {
        console.error(error);
      } else {
        console.log(stdout);
      }
    });
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Webhook listening on port 3000');
});


var Twitter = require('twitter');
var config = require('./config');

var client = new Twitter(config.credentials);

/**
 * Set interval to compose and sent tweets.
 */
setInterval(function() {
  client.post('statuses/update', {
    status: composeTweet()
  }, function(err, tweet, res) { });
}, config.interval);

/**
 * Compose tweet message.
 * @return {string} composed tweet.
 */
function composeTweet() {
  return [
    'There are ',
    humanizedTime(),
    ' left until ',
    config.event
  ].join('');
}

/**
 * Generate humanized time left until event.
 * @return {string} humanized time stamp
 */
function humanizedTime() {
  var timeLeft = Math.floor((config.finalDate - Date.now()) / 1000),
    vals = {
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0
    };

  vals.days = timeLeft >= 86400 ? ~~(timeLeft / 86400) : 0;
  timeLeft = timeLeft - (vals.days * 86400);
  vals.hours = timeLeft >= 3600 ? ~~(timeLeft / 3600) : 0;
  timeLeft = timeLeft - (vals.hours * 3600);
  vals.mins = timeLeft >= 60 ? ~~(timeLeft / 60) : 0;
  timeLeft = timeLeft - (vals.mins * 60);
  vals.secs = timeLeft;

  return vals.days + ' days, ' + vals.hours + ' hours, ' + vals.mins + ' minutes, and ' + vals.secs + ' seconds';
}

const request = require('request');
const captcha = require('./captcha');
const chalk = require('chalk');
const log = require('./utils/log');

var start = function(data, callback) {
  if (data.service == "2Captcha") {
    captcha.getTokenTwoCap(data.key, data.poll, data.maximumSolves);
  } else if (data.service == "AntiCap") {
    log(chalk.bgBlack.red(`Error @ Task ${data.key}`));
    log(chalk.bgBlack.red(`AntiCaptcha has not yet been implemented, sorry for the inconvenience.`));
  }
  return callback(null, true);
}

module.exports = {
  start: start
};

const request = require('request');
const config = require('./config');
const moment = require('moment');
const chalk = require('chalk');
const _ = require('underscore');
const log = require('./utils/log');
const events = require('./events');

var solveCount = 0;

var getTokenTwoCap = function(key, pollMs, maximumSolves) {

    var twoCapID;

    var checkCaptcha = function() {
        request({
            url: 'http://2captcha.com/res.php',
            method: 'get',
            qs: {
                key: key,
                action: 'get',
                id: twoCapID
            }
        }, function(err, res, body) {

            //console.log('body', body)
            if (body.substring(0, 2) == "OK") {

                log(chalk.bgBlack.green(`Captcha Token Retrieved from 2captcha`));

                var gCapRes = body.split('|')[1]

                var token = {
                    id: twoCapID,
                    token: gCapRes,
                    timestamp: moment().utc().toString()
                }

                events.emit('captchaRetrieved', token);

                log(chalk.bgBlack.yellow(`Requesting for another Captcha token in ${pollMs}ms`));

                setTimeout(function() {
                    if (maximumSolves == null) {
                      getTokenTwoCap(key, pollMs);
                      solveCount++;
                    } else if (maximumSolves >= solveCount) {
                      log(chalk.bgBlack.red(`Captcha Solve Count Maxed, no longer solving for ${key}`));
                      return
                    } else {
                      getTokenTwoCap(key, pollMs);
                      solveCount++;
                    }
                }, pollMs);

                setTimeout(function() {
                    log(chalk.bgBlack.red(`Captcha Token Expired (${twoCapID})`));
                }, 110000);

            } else if (body == 'CAPCHA_NOT_READY') {
                setTimeout(checkCaptcha, 2000);
            } else if (body == 'ERROR_CAPTCHA_UNSOLVABLE') {
                log(chalk.bgBlack.red(`Captcha Unsolvable (${twoCapID})`));
                getTokenTwoCap(key);
            }
        });
    }

    if (key == '' || key == null) {
        log(chalk.bgBlack.red('No 2captcha key present.'));
    } else {
        request({
            url: 'http://2captcha.com/in.php',
            method: 'get',
            qs: {
                key: key,
                method: 'userrecaptcha',
                googlekey: config.sitekey,
                pageurl: config.pageurl
            }
        }, function(err, res, body) {
            if (body.substring(0, 2) == "OK") {

                twoCapID = body.split('|')[1];
                log(chalk.bgBlack.yellow(`Token request sent via 2Captcha (${twoCapID})`));
                log(chalk.bgBlack.yellow(`Waiting for token... (${twoCapID})`));

                checkCaptcha();
            } else {
                log(chalk.bgBlack.red('Error occured while trying to request for 2captcha.'));
                getTokenTwoCap(key);
            }
        });
    }
}

module.exports = {
    getTokenTwoCap: getTokenTwoCap
};

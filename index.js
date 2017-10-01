require('console-stamp')(console, {
  colors: {
    stamp: 'yellow',
    label: 'cyan',
    label: true,
    metadata: 'green',
  },
});

const async = require('async');
const config = require('./config');
const log = require('./utils/log');
const chalk = require('chalk');
const taskLib = require('./task');

const db = require('knex')(config.database);
require('./database/db.js')(db);

var events  = require('./events');

var taskArr = [];

log('------------------------------------------------');
log('     CapSnap | for 2Captcha & Anti-Captcha');
log('------------------------------------------------');
log('               Developed by dzt');
log('------------------------------------------------');

log(chalk.bgBlack.green('config.json file has been loaded'));
log(chalk.bgBlack.blueBright(`Key Count`));
log(chalk.bgBlack.blueBright(`2Captcha: ${config['2cap_keys'].length}`));
log(chalk.bgBlack.blueBright(`Anti-Captcha: ${config['anticap_keys'].length}`));
log(chalk.bgBlack.blueBright(`Total: ${config['anticap_keys'].length + config['2cap_keys'].length}`));

log('------------------------------------------------');

tranformConfig();

function tranformConfig() {
  for (var i = 0; i < config["2cap_keys"].length; i++) {
    taskArr.push({
      service: "2Captcha",
      poll: config["2cap_keys"][i].poll,
      qty: config["2cap_keys"][i].qty,
      key: config["2cap_keys"][i].key,
      maximumSolves: config["2cap_keys"][i].maximumSolves
    });
  }

  for (var i = 0; i < config["anticap_keys"].length; i++) {
    taskArr.push({
      service: "AntiCap",
      poll: config["anticap_keys"][i].poll,
      qty: config["anticap_keys"][i].qty,
      key: config["anticap_keys"][i].key,
      maximumSolves: config["anticap_keys"][i].maximumSolves
    });
  }

  init();
}

function init() {

  var tasks = [];

  taskArr.map(function(task, i) {
    tasks.push(function(cb) {
      taskLib.start(task, (err, response) => {
        if (err) {
          log(chalk.redBright.red(err), 'error');
          return process.exit(1);
        }
        return cb(null, response);
      });
    });
  });

  async.parallel(tasks, function(err, res) {
      if (err) {
        log(chalk.bgBlack.redBright(err), 'error');
        return process.exit(1);
      } else {
        log(chalk.bgBlack.green('All asks have been successfully Initialized'));
        log('------------------------------------------------');
      }
    });

}

events.on('captchaRetrieved', (data) => {

  db.table('tokens').insert({value: data.token, 'timestamp': data.timestamp, 'page': config.pageurl, 'sitekey': config.sitekey, 'source': '2Captcha'}).then((token) => {
		log(chalk.bgBlack.green(`Saved to SQLite DB (${data.id})`));
	}).catch(function(error) {
    console.log(error);
  })

  if (config.injectToBot.enabled) {
    log(chalk.bgBlack.green(`Sending Token Value to Slayer (${data.id})`));
  }

});

const chalk = require('chalk');
const log = console.log;

module.exports = {
  error: (...args) => log(chalk.red(...args)),
  log: (...args) => log(chalk.bgBlue(...args)),
  success: (...args) => log(chalk.bgGreen(...args)),
}

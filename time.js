const readline = require('readline');
const moment = require('moment');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const hoursToWorkToday = () => {
  return new Promise(resolve => {
    rl.question(
      chalk.cyan('Number of hours to work today: '),
      answer => {
        const result = answer;
        resolve(result);
      }
    );
  });
};

const hoursWorkedSoFar = () => {
  return new Promise(resolve => {
    rl.question(
      chalk.cyan('Total hours worked (up to last clock-in time): '),
      answer => {
        const result = answer;
        resolve(result);
      }
    );
  });
};

const timeIn = () => {
  return new Promise(resolve => {
    rl.question(chalk.cyan('Time of last clock-in (e.g. 12:30 PM): '), answer => {
      const time = moment(answer, 'HH:mm a').format('LT');
      resolve(time);
    });
  });
};

const main = async () => {
  const hoursToWorkPerDayInMinutes = (await hoursToWorkToday()) * 60;
  const timeLeft = hoursToWorkPerDayInMinutes - (await hoursWorkedSoFar() * 60);

  let timingInAndOut = [];
  timingInAndOut.push(await timeIn());

  const timeToClockOut = moment(
    timingInAndOut[timingInAndOut.length - 1],
    'HH:mm a'
  )
    .add(timeLeft, 'minutes')
    .format('LT');

  console.log(
    chalk.yellow('You should clock out at: ', chalk.magenta(timeToClockOut))
  );

  rl.close();
};

main();

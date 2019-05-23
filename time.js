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
      'How many hours are you working today? Enter a real number value: ',
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
      'How many hours have you worked so far? Enter a real number value: ',
      answer => {
        const result = answer;
        resolve(result);
      }
    );
  });
};

const timeIn = () => {
  return new Promise(resolve => {
    rl.question('Last time you clocked in? Enter the time: ', answer => {
      const time = moment(answer, 'HH:mm a').format('LT');
      resolve(time);
    });
  });
};

const main = async () => {
  console.log(
    chalk.yellow(
      'For timing in, enter the time shown on your work timesheet. Be sure to include AM or PM.\nExamples: 8:00 AM, 09:00 AM, 10:39 AM, 1:25 PM, 13:25 PM, etc.'
    )
  );

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

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

const timesClockedOut = () => {
  return new Promise(resolve => {
    rl.question(
      'How many times did you clock out today? Enter an integer value: ',
      answer => {
        const result = answer;
        resolve(result);
      }
    );
  });
};

const timeIn = () => {
  return new Promise(resolve => {
    rl.question('Time in: ', answer => {
      const time = moment(answer, 'HH:mm a').format('LT');
      resolve(time);
    });
  });
};

const timeOut = () => {
  return new Promise(resolve => {
    rl.question('Time out: ', answer => {
      const time = moment(answer, 'HH:mm a').format('LT');
      resolve(time);
    });
  });
};

const main = async () => {
  console.log(
    chalk.yellow(
      'For timing in or out, enter the time shown on your work timesheet. Be sure to include AM or PM.\nExamples: 8:00 AM, 09:00 AM, 10:39 AM, 1:25 PM, 13:25 PM, etc.'
    )
  );

  const maxClocksOut = await timesClockedOut();

  let timingInAndOut = [];

  timingInAndOut.push(await timeIn());
  for (let i = 0; i < maxClocksOut; i++) {
    timingInAndOut.push(await timeOut());
    timingInAndOut.push(await timeIn());
  }

  let totalMinutesPassed = 0;

  for (let i = 0; i <= maxClocksOut; i += 2) {
    let minutesPassed = moment(timingInAndOut[i + 1], 'HH:mm a').diff(
      moment(timingInAndOut[i], 'HH:mm a'),
      'minutes'
    );
    totalMinutesPassed += minutesPassed;
  }

  const hoursToWorkPerDayInMinutes = (await hoursToWorkToday()) * 60;
  const timeLeft = hoursToWorkPerDayInMinutes - totalMinutesPassed;

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

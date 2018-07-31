const readline = require('readline');
const moment = require('moment');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const q1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Time in: ', answer => {
      const time = moment(answer, 'HH:mm').format('LT');
      resolve(time);
    });
  });
};

const q2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Time out: ', answer => {
      const time = moment(answer, 'HH:mm').format('LT');
      resolve(time);
    });
  });
};

const q3 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Time in: ', answer => {
      const time = moment(answer, 'HH:mm').format('LT');
      resolve(time);
    });
  });
};

const main = async () => {
  const answer1 = await q1();
  const answer2 = await q2();
  const answer3 = await q3();

  const startTime = moment(answer1, 'HH:mm');
  const minutesPassed = moment(answer2, 'HH:mm').diff(startTime, 'minutes');

  const hoursToWorkPerDayInMinutes = 480;
  const timeLeft = hoursToWorkPerDayInMinutes - minutesPassed;

  const timeToClockOut = moment(answer3, 'HH:mm')
    .add(timeLeft, 'minutes')
    .format('LT');

  console.log('You should clock out at: ', timeToClockOut);

  rl.close();
};

main();

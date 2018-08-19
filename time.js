const readline = require('readline');
const moment = require('moment');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const q1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Time in: ', answer => {
      const time = moment(answer, 'HH:mm a').format('LT');
      console.log('TIME: ', time);
      resolve(time);
    });
  });
};

const q2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Time out: ', answer => {
      const time = moment(answer, 'HH:mm a').format('LT');
      console.log('TIME: ', time);
      resolve(time);
    });
  });
};

const main = async () => {
  console.log(
    'Be sure to enter times correctly. Examples: 8:00 AM, 10:39 AM, 1:25 PM, 13:25 PM, etc.'
  );

  let timingInAndOut = [];

  timingInAndOut.push(await q1());
  for (let i = 0; i < 1; i++) {
    timingInAndOut.push(await q2());
    timingInAndOut.push(await q1());
  }

  const startTime = moment(timingInAndOut[0], 'HH:mm a');
  const minutesPassed = moment(timingInAndOut[1], 'HH:mm a').diff(
    startTime,
    'minutes'
  );

  const hoursToWorkPerDayInMinutes = 480;
  const timeLeft = hoursToWorkPerDayInMinutes - minutesPassed;

  const timeToClockOut = moment(timingInAndOut[2], 'HH:mm a')
    .add(timeLeft, 'minutes')
    .format('LT');

  console.log('You should clock out at: ', timeToClockOut);

  rl.close();
};

main();

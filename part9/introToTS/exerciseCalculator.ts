interface arguments {
  dailyHours: Array<number>,
  target: number
}

const parseArguments = (args: Array<string>): arguments => {
  if (args.length < 4)
    throw new Error('incorrect argument length. Usage: npm run exercise [<dailyHours>] <target>');

  const [, , ...mainArgs] = args;

  const target = Number(mainArgs.pop());
  if (isNaN(target))
    throw new Error('target value is not a number');

  const dailyHours = mainArgs.map(a => {
    if (isNaN(Number(a)))
      throw new Error('dailyHours do not contain all numbers');
    return Number(a);
  });

  return { dailyHours, target };
};

interface returnObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyHours: Array<number>, target: number): returnObject => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours !== 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = average - target < 0 ? 1
    : average - target < 1 ? 2
      : 3;
  const ratingDescription = rating === 1 ? 'do better'
    : rating == 2 ? 'average'
      : 'amazing';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Something went wrong:', e.message);
}

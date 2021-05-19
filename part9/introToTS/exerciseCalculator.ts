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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
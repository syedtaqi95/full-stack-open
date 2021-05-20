export const calculateBmi = (height: number, weight: number): string => {
  if (height === 0)
    throw new Error('height cannot be 0');

  const bmi = weight / (height / 100) ** 2;

  if (bmi < 15)
    return 'Very severely underweight'
  else if (bmi >= 15 && bmi < 16)
    return 'Severely underweight'
  else if (bmi >= 16 && bmi < 18.5)
    return 'Underweight'
  else if (bmi >= 18.5 && bmi < 25)
    return 'Normal (healthy weight)'
  else if (bmi >= 25 && bmi < 30)
    return 'Overweight'
  else if (bmi >= 30 && bmi < 35)
    return 'Obese Class I (Moderately obese)'
  else if (bmi >= 35 && bmi < 40)
    return 'Obese Class II (Severely obese)'
  else if (bmi >= 40)
    return 'Obese Class III (Very severely obese)'
  else
    return 'Could not calculate BMI'
}

interface heightWeight {
  height: number,
  weight: number,
}

const parseArgs = (args: Array<string>): heightWeight => {
  if (args.length !== 4)
    throw new Error('incorrect argument length. Usage: npm run bmi <height> <weight>')
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  }
  else {
    throw new Error('Arguments were not numbers');
  }
}

try {
  const {height, weight} = parseArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  // console.log('Something bad happened:', e.message);
}

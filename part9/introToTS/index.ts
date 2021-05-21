import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const bmiResult = {
      weight,
      height,
      bmi: calculateBmi(height, weight),
    };
    return res.json(bmiResult);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment 
    return res.status(400).json({ error: e.message });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line
    if (req.body.daily_exercises && req.body.target) {
      // eslint-disable-next-line
      const dailyHours = req.body.daily_exercises.map((hours: number) => {
        if (isNaN(hours))
          throw new Error('malformatted parameters');
        return Number(hours);
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (isNaN(Number(req.body.target)))
        throw new Error('malformatted parameters');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const target = Number(req.body.target);

      const result = calculateExercises(dailyHours, target);
      return res.json(result);

    } else {
      throw new Error('parameters missing');
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment 
    return res.status(400).json({ error: e.message });
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
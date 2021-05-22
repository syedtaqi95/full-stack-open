import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosesRouter';
import patientsRouter from './routes/patientsRouter';

// Express app config
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);

// Ping request
app.get('/api/ping', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`pinged by ${ip}`);
  res.send('pong');
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

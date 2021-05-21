import express from 'express';
const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`pinged by ${ip}`);
  res.send('pong');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

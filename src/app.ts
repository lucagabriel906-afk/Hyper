import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('O sistema está a funcionar!');
});

export default app;


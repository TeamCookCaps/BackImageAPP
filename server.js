const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// REST API GET메서드 예시
app.get('/api/data', (req, res) => {
    res.send('Data retrieved successfully!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


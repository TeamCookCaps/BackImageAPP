const express = require('express');
const db = require('./config/dbconfig.js');
const dbsetting = require('./dbsetting.js');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// REST API GET메서드 예시
app.get('/api/data', (req, res) => {
    res.send('Data retrieved successfully!');
});

// DB에서 test 데이터 가져오기
app.get('/testDB', async(req, res) => {
    const query = 'SELECT TESTID, TESTPW FROM TESTTABLE';
    let [rows, fields] = await db.pool.query(query);
    
    res.send(rows);
})

// DB에 table 생성
app.get('/createDB', (req, res) => {
  dbsetting.dbinit();
  console.log(`DB setting successfully`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
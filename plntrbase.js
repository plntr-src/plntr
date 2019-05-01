var express = require('express');
var cors = require('cors');
var path = require('path');
const pino = require('express-pino-logger')();
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(pino);

app.get('/', function (_req, res) {
  console.log('test');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


var testData = require('./src/dummydata/forageData.json');
var cols = require('./src/dummydata/cols.json');

app.get('/cols', (_req, res) => {
  return res.send(cols);
})

app.get('/forage', (_req, res) => {
 return res.send(testData);
});

app.get('/search', (_req, res) => {
  console.log(
    'searching for: ',
    
  )
})

app.post('/add', (_req, res) => {
  console.log('add plnt');
});

app.get('/sort', (_req, res) => {
  console.log('sort data');
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
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

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
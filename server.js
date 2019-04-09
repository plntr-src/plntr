var express = require('express');
var cors = require('cors');
var path = require('path');
var https = require('https');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/test', function (_req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
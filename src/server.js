const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
var path = require('path');
const pino = require('express-pino-logger')();
require('dotenv').config();

const cn = {
	host: 'localhost',
	port: 5432,
	database: 'plntrdb',
	user: 'seedguardian',
	password: 'peppermintbutler'
};

var pgp = require('pg-promise')()
var db = pgp(cn)

const port = 3001;
const server = express();

server.use(cors())
server.use(bodyParser.json())
server.use(pino);

server.get('/', function (_req, res) {
  console.log('test');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/forage', (_req, res) => {
	db.any('SELECT * FROM flowerbed;')
	  .then(function (data) {
	  	res.status(200)
	    .json({
	    	status: 'success',
	    	body: {
	    		docs: data
	    	},
	    	message: 'Look at what we found in the flowerbed'
	    });
	  })
	  .catch(function (error) {
	    console.log('ERROR foraging:', error)
	  })
});

server.get('/cols', (_req, res) => {
	db.any('SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=\'flowerbed\';')
	  .then(function (data) {
	  	res.status(200)
	    .json({
	    	status: 'success',
	    	body: data.map(col => {
					return col['column_name'];
				 }),
	    	message: 'Successfully retrieved all columns'
	    });
	  })
	  .catch(function (error) {
	    console.log('ERROR getting columns:', error)
	  })
});

server.post('/add', (_req, res) => {
});

server.post('/delete', (_req, res) => {
});

server.put('/edit', (_req, res) => {
});

server.get('/sort', (_req, res) => {
  console.log('sort data');
});

server.listen(port, () =>
  console.log(`PLNTR is listening on port ${port}!`),
);
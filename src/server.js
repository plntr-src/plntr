const express = require('express')
const bodyParser = require('body-parser')
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

server.use(bodyParser.json())

server.get('/', (req, res) => {
	return res.send('Server is doing something\n');
});

server.get('/forage', (req, res) => {
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

server.get('/cols', (req, res) => {
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

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
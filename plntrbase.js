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
	const data = _req.body;
  console.log('data: ', data);
	db.any(`INSERT into flowerbed (genus, species, common_name, water_freq, hardiness, soil, companions, sun, image, edible_parts) values ('${
		  data.genus
		}', '${
			data.species
		}', '${
			data.common_name
		}', ${
			data.water_freq
		}, '{${
			data.hardiness	
		}}', '{${
			data.soil
		}}', '{${
			data.companions
		}}', ${
			data.sun
		}, '${
			data.image
		}', '{${
			data.edible_parts
		}}') RETURNING id;`)
		.then(response => {
			console.log('response: ', response)
			res.status(200)
	    .json({
				postId: response[0].id,
	    	status: 'success',
	    	message: `Successfully added new data for ${data.genus + ' '+ data.species}.`
	    });
		})
		.catch(error => {
			console.log('ERROR inserting new data:', error)
		})
});

server.delete('/delete', (_req, res) => {
	const postId = _req.body.id;
	db.any(`DELETE FROM flowerbed WHERE id='${ postId }';`)
	.then(response => {
		console.log('resp aft del: ', response)
		res.status(200).json({
			status: 'success',
			message: `Successfully deleted entry for plnt-id ${ postId }.`
			// should have flag to signal refresh?
		})
	})
	.catch(err => {
		console.log(`ERROR deleting data plnt-id ${ postId }. \nError: ${ err }`);
	})
});

server.put('/edit', (_req, res) => {
});

server.get('/sort', (_req, res) => {
  console.log('sort data');
});

server.listen(port, () =>
  console.log(`PLNTR is listening on port ${port}!`),
);
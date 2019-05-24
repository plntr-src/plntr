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


//EDIT requires the document ID to be passed
//from the front-end in order to identify which document to
//correctly update
//IS IT BETTER TO ADD EVERYTHING IN LOWERCASE FOR SEARCH CASE INSENSITIVITY?
server.post('/edit', (_req, res) => {
	var id = _req.body.id
	var genus = (_req.body.genus !== "") ? _req.body.genus: '--'
	var species = (_req.body.species !== "") ? _req.body.species.toLowerCase() : '--'
	var common_name = (_req.body.common_name !== "") ? _req.body.common_name : '--'
	var water_freq = (_req.body.water_freq !== "") ? _req.body.water_freq : '--'
	var hardiness = (_req.body.hardiness !== "") ? '{'+_req.body.hardiness.join(',')+'}' : '{"--"}'
	var soil = (_req.body.soil !== "") ? '{'+_req.body.soil.join(',')+'}' : '{"--"}'
	var companions = (_req.body.companions !== "") ? '{'+_req.body.companions.join(',')+'}' : '{"--"}'
	var sun = (_req.body.sun !== "") ? _req.body.sun : '--'
	var image = (_req.body.image !== "") ? _req.body.image : '--'
	var edible_parts = (_req.body.edible_parts !== "") ? '{'+_req.body.edible_parts.join(',')+'}' : '{"--"}'

	db.any(`UPDATE flowerbed
		SET
			genus = '${genus}', 
			species = '${species}', 
			common_name = '${common_name}', 
			water_freq = ${water_freq}, 
			hardiness = '${hardiness}', 
			soil = '${soil}', 
			companions = '${companions}', 
			sun = ${sun}, 
			image = '${image}', 
			edible_parts = '${edible_parts}'
		WHERE id = ${id}
			;`)
		.then(function (data) {
			res.status(200)
			.json({
				status: 'success',
				message: `${common_name} was successfully maintained`
			});
		})
		.catch(function (error) {
			console.log('ERROR editting data:', error)
		})
		console.log(`editting document ${id}`);
});

//Sort mode must be passed as an API parameter:
// /sort?sortMode=common_name
// value of sortMode is the column that we want to sort by
server.get('/sort', (_req, res) => {
	if (_req.query.sortMode !== null && _req.query.sortMode !== undefined){
		var sortMode = _req.query.sortMode
	} else {
		var sortMode = 'common_name'
	}
	db.any(`SELECT * FROM flowerbed ORDER BY ${sortMode} ASC;`)
		.then(function (data) {
			res.status(200)
			.json({
				status: 'success',
				body: {
					docs: data
				},
				message: `We organized the flowerbed by ${sortMode}`
			});
		})
		.catch(function (error) {
			console.log(`ERROR sorting by ${sortMode} :`, error)
		})
		console.log('sort data');
});


//Search requires two parameters:
// keyword=<keyword>
// col=<column to search>
// endpoint looks like /search?keyword=<keyword>&col=<column>
// In version 1, search will only support exact match
server.get('/search', (_req, res) => {
	var keyword = _req.query.keyword
	var col = _req.query.col

	if(col == "hardiness" || col == "soil" || col == "companions" || col == "edible_parts"){
		db.any(`SELECT * FROM flowerbed WHERE '${keyword}' = ANY(${col});`)
			.then(function (data) {
				res.status(200)
				.json({
					status: 'success',
					body: {
						docs: data
					},
					message: `We found what you're looking for`
				});
			})
			.catch(function (error) {
				console.log(`ERROR searching for ${keyword} in column ${col}:`, error)
		})
	} else {
		db.any(`SELECT * FROM flowerbed WHERE ${col} = '${keyword}';`)
			.then(function (data) {
				res.status(200)
				.json({
					status: 'success',
					body: {
						docs: data
					},
					message: `We found what you're looking for`
				});
			})
			.catch(function (error) {
				console.log(`ERROR searching for ${keyword} in column ${col}:`, error)
			})
		}
		console.log(`searching for ${keyword} in column ${col}`);
});

server.listen(port, () =>
  console.log(`PLNTR is listening on port ${port}!`),
);
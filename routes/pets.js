var express = require('express');
var router = express.Router();
var blockspring = require("blockspring");
var dataManager = require("../filedb");
var async = require("async");

var pets = [];
var rows = [];
var cols = [];
var maxPerRow = 4;
var timer = 0;

function handleData(data) {
	timer = data.list.length;
	data.list.forEach(function (pet) {
		getImage(pet, undefined, data.list);
	});
	pets = data.list;
}

dataManager.load('pets.json', handleData);


function getImage(pet, cb, list) {
	if(pet.image.length !== 0) {
		timer--;
		if(timer === 0) {
	  	formatData(list);
	  }
		if(cb !== undefined) {
	  	cb(pet);
	  }
	  return;
	}
	blockspring.runParsed("google-image-search-first-result", { "text_search": pet.species}, {"api_key": '12b4e364de25310cb5f4a340fe5ebff7'}, function(result) {
	  var r = result.params.image;
	  pet.image = r.replace(/^(.+?\.(png|jpe?g)).*$/i, '$1');
	  console.log(pet.name + " - " + pet.image);
	  timer--;
	  if(timer === 0) {
	  	formatData(pets);
	  }
	  if(cb !== undefined) {
	  	cb(pet);
	  }
	});
}		 

function formatData(list) {
	rows = [];
	cols = [];
	list.forEach(function(val, index, arr) {
		if (cols.length >= maxPerRow) {
			rows.push(cols);
			cols = [];
		} 
		cols.push(val);
	});
	if (cols.length !== 0) {
		rows.push(cols);
	}
}

router.get('/', function(req, res) {
	res.render('pets', {
		title: 'Pets',
		pets: pets,
		rows: rows
	});
});

router.get('/:name', function (){
	console.log("Requested pet page: " + pet.name);
});

router.post('/', function(req, res) {
	pets.push(req.body);
	
	getImage(req.body, function() {
		dataManager.save('pets.json', pets, function (result) {
			console.log(result);
		});
	});
	res.render('pets', {
		title: 'Pets',
		pets: pets,
		rows: rows
	});
});

module.exports = router;
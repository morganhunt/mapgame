var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Player = mongoose.model('Player');

/* GET home page. */
router.get('/players', function(req, res, next) {
	Player.find(function(err, players){
		if(err){return next(err);}
		res.json(players);
	})
});

// This should post a player to the database.
router.post('/players', function(req, res, next){
	var player = new Player(req.body);
	player.save(function(err, song){
		if(err){return next(err);}
		res.json(song);
	});
});


module.exports = router;

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

//Get a player from the database.
router.get('/players/:player', function(req, res){
	res.json(req.song);
});

//Get Top 10 High Scores.
router.get('/highscores', function(req, res, next){
	console.log("In highscore route");
	Player.find().limit(10).select({name:1,score:1}).sort({score:-1}).exec(function(err,scores){
		if(err) return console.error(err);
		else{
			console.log(scores);
			res.json(scores);
		}
	});
});


// router.put('/players', function(req, res, next){
// 	console.log("in the PUT route");
// 	console.log(req.query);
// 	var something = 'ObjectId("' + req.query.q + '")';
// 	player.update(
// 		{_id:something},
// 		{
// 			$set:{
// 				score: req.query.s
// 			},
// 		},
// 		function(err, update){
// 			if(err)return conole.error(err);
// 			else{
// 				console.log(update);
// 				return;
// 			}
// 		}
// 	);
// })

module.exports = router;

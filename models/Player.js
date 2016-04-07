var mongoose = require('mongoose');
var PlayerSchema = new mongoose.Schema({
	name: String,
	score: {type: Number, default: 0},
});
mongoose.model('Player', PlayerSchema);
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/LEAGUE");





var fantasyTeamPlayersSchema = new Schema ({
	players: Array,
});






var Player = mongoose.Model ('Player', playerSchema);
var Team = mongoose.Model ('Team', teamSchema);
module.exports = Team;
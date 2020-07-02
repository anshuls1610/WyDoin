var mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.Promise = Promise;

var url = process.env.DATABASEURL || 'mongodb://localhost:27017/api_status';
mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
	useCreateIndex: true
    }).then(() => {
		console.log("Connected to DB!");
	}).catch(err => {
		console.log("Error: cd ", err.message);
});

module.exports.User = require('./user');
module.exports.Status = require('./status');

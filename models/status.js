var mongoose = require('mongoose');

 var statusSchema = new mongoose.Schema({
	 status: String,
	 created_date: {
		 type: Date,
		 default: Date.now
	 },
	 author: 
	{	
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		fname: String,
		image: {
		type: String,
		default: 'https://img.pngio.com/user-logos-user-logo-png-1920_1280.png'
		},
		username: String
	}
 });

module.exports = mongoose.model('Status', statusSchema);
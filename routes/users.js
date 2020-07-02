var express  = require('express'),
	router 	 = express.Router(),
	passport = require('passport'),
	db = require('../models/index');

router.get('/', isLoggedIn, (req, res) =>{
	db.User.find({})
	.then(function addusers(user){
		res.render('users', {users: user});
	})
	.catch((err) =>{
		console.log(err)
	})
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}	
	res.redirect('/login');
}

module.exports = router;
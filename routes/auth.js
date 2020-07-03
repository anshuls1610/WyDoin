var express  = require('express'),
	router 	 = express.Router(),
	passport = require('passport'),
	db 		 = require('../models/index');

//show register form
router.get('/register', (req, res) =>{
	res.render('register');
})

router.post('/register', (req,res) =>{
	var newUser = new db.User({fname: req.body.fname, username: req.body.username});
	db.User.register(newUser, req.body.password, (err, user) =>{
		if(err){
			req.flash('error', 'error: ' + err.message)
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, function(){
			req.flash('success', 'Welcome to wydoin?' + user.username)
			res.redirect('/');
			
		});
	});
});

//Login route
router.get('/login', (req,res) =>{
	res.render('login');
});

//middleware
router.post('/login', passport.authenticate('local',
	{
		successRedirect: '/',
		failureRedirect: '/login'
	}) ,(req,res) =>{
});

//Logout Route
router.get('/logout', (req,res) =>{
	req.logout();
	req.flash('success', 'Successfully logged out')
	res.redirect('/');
});

module.exports = router;
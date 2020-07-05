var express  = require('express'),
	router 	 = express.Router(),
	passport = require('passport'),
	axios	 = require('axios'),
	db = require('../models/index');

//get route for status
router.get('/', (req, res) =>{
	axios({
		method: 'get',
		url: 'status',
		baseURL: process.env.BASEURL || 'https://api-oqcqf.run-ap-south1.goorm.io/api/'
	})
  	.then((response)=> {
		res.render('index', {response: response});
	})
	.catch(err =>{
		console.log(err)
	})
});

//EDIT ROUTE
router.get('/:id/edit', isOwner, (req,res) =>{
	var id= req.params.id;
	axios({
		method: 'get',
		url: 'status/' + id,
		baseURL: process.env.BASEURL || 'https://api-oqcqf.run-ap-south1.goorm.io/api/'
	})
	.then((response)=> {
		res.render('edit', {response: response});	
	})
	.catch(err =>{
		console.log(err)
	})
});

function isOwner(req,res,next){
	if(req.isAuthenticated()){
		db.Status.findById(req.params.id, (err, foundStatus) =>{
			if(err || !foundStatus){
				res.redirect('back');
			} else {
				if(foundStatus.author.id.equals(req.user._id)){
					return next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to login first!')
		res.redirect('/login');
	}
}

module.exports = router;
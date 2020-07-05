var express = require('express'),
	router	= express.Router(),
	db		= require('../models');

//get api route
router.get('/', (req,res) =>{
	db.Status.find()
	.then((statuses) =>{
		res.json(statuses);
	})
	.catch((err) =>{
		res.send(err);
	});
});

//post api route
router.post('/', isLoggedIn, (req,res) =>{
	var status = req.body.status;
	var author = {
			id: req.user._id,
			fname: req.user.fname,
			username: req.user.username
		}
	var newStat = {status: status, author: author}
	 db.Status.create(newStat)
	.then((newStatus) =>{
		res.status(201).json(newStatus);
	})
	.catch((err) =>{
		res.send(err);
	})
});

//show api route
router.get('/:statusId', (req,res) =>{
	db.Status.findById(req.params.statusId)
	.then((foundStatus) =>{
		return res.json(foundStatus);
	})
	.catch((err) =>{
		res.send(err);	
	})
});

//update api route
router.put('/:statusId', isLoggedIn, (req,res) =>{
	db.Status.findOneAndUpdate({_id: req.params.statusId}, req.body, {new: true})
	.then((updateStatus) =>{
		res.redirect('/');
	})
	.catch((err) =>{
		res.send(err);
	})
});

//delete api route
router.delete('/:statusId', isLoggedIn, (req,res) =>{
	db.Status.remove({_id: req.params.statusId})
	.then(() =>{
		res.redirect('/');
	})
	.catch((err) =>{
		res.send(err);
	})
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}	
	res.redirect('/login');
}

module.exports = router;
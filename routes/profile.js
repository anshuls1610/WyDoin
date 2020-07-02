var express  = require('express'),
	router 	 = express.Router(),
	passport = require('passport'),
	db = require('../models/index');

router.get('/:id/profile', statusOwner, function(req, res){
});

function statusOwner(req,res,next){
	if(req.isAuthenticated()){
		db.User.findById(req.params.id, (err, foundUser) =>{
			if(err || !foundUser){
				res.redirect('back');
			} else {
				db.Status.find().where('author.id').equals(foundUser._id).exec((err, statuses) => {
      				if(err) {
        				return res.redirect('/');
      				} else{
						res.render('profile', {user: foundUser, statuses: statuses});
					}
      			})
			}
		});
	} else {
		res.redirect('/login');
	}
}

module.exports = router;
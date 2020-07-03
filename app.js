var express 		 = require('express'),
	app				 = express(),
	bodyParser 		 = require('body-parser'),
	ejs				 = require('ejs'),
	passport   		 = require('passport'),
	localStrategy 	 = require('passport-local'),
	session			 = require('express-session'),
	methodOverride	 = require('method-override'),
	multer 			 = require('multer'),
	flash			 = require('connect-flash'),
	Index			 = require('./models/index'),
	Status			 = require('./models/status'),
	axios			 = require('axios'),
	User 			 = require('./models/user');

var indexRoutes	  = require('./routes/index'),
	apiRoutes 	  = require('./routes/api'),
	authRoutes	  = require('./routes/auth'),
	usersRoutes	  = require('./routes/users'),
	profileRoutes = require('./routes/profile');


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


//PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: 'Anshul will be the best',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//middleware
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.locals.moment = require('moment');
app.use(flash());

//middleware for user login/logout navbar
app.use(function getUser(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error	   = req.flash("error");
	res.locals.success	   = req.flash("success");
	return next();
});

app.use(indexRoutes);
app.use(authRoutes);
app.use('/api/status', apiRoutes),
app.use('/users', usersRoutes),
app.use('/', profileRoutes);


var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('API server has started');
});
	
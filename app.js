const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local');

// Models
const User = require('./models/user');

// Template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
const adminRoutes = require('./routes/admin');

mongoose.connect(process.env.DB);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "once again Rusty wins cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

app.get('/', (req, res, next) => {
    res.redirect('/login');
})

// use routes
app.use('/admin', adminRoutes);

// SHOW REGISTER FORM
app.get('/register', function(req, res) {
    res.render('user/register');
})

// HANDLE SIGNUP LOGIC
app.post("/register", function(req, res) {
    var newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        mobilenumber: req.body.mobilenumber
    });
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       } 
       passport.authenticate("local")(req, res, function(){
          res.redirect("/admin/dashboard");
       });
    });
 });

//SHOW LOGIN FORM
app.get('/login', function(req, res) {
    res.render('user/login')
} );

//HANDLING LOGIN LOGIC
app.post("/login", passport.authenticate("local",
    {
       successRedirect: "/admin/dashboard",
       failureRedirect: "/login"
    }), function(req, res) {
});

//LOGOUT LOGIC
app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/login');
});

app.listen(3000, function() {
    console.log('3000 running');
})
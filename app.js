var express               = require('express'),
    app                   = express(),
    body                  = require('body-parser'),
    methodOverride        = require("method-override"),
    mongoose              = require('mongoose'),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    flash                 = require("connect-flash"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require('./models/user'),
    Product               = require('./models/product')

var cart      = require('./routes/cart'),
    index     = require('./routes/index'),
    product   = require('./routes/product'),
    payment   = require('./routes/payment')

//==============================================================================

mongoose.connect("mongodb://localhost:27017/clickpick", {useNewUrlParser: true,
useUnifiedTopology: true
});
//mongodb+srv://Arpit:12345@cluster0.o7pzj.mongodb.net/clicknpick?retryWrites=true&w=majority
mongoose.connection.on('connected',()=>{
    console.log("Also connected to mongo Database!!!");
});
mongoose.connection.on('error',(err)=>{
    console.log("Error connecting to mongo Database ", err);
});

//=============================================================================
mongoose.set('useFindAndModify', false);
app.use(body.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");
app.use(flash());
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "I love Virat and Arijit",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentuser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

//============================================================================
app.use(index);
app.use(product);
app.use(cart);
app.use(payment);
//============================================================================
app.listen((process.env.PORT || 3000),function(){
    console.log("You are now connected to ClickNpick");
})
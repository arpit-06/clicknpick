var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
const user = require('../models/user');


router.get('/register', (req, res)=> {
    res.render('register');
})
router.post('/register', (req, res)=>{
    var newUser = new User({username:req.body.email, name: req.body.name, mobile: req.body.mobile, address: req.body.address, profile: req.body.profile, isAdmin: false });
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message);
            return res.render('register');
        }
        else{
            req.flash("success", "YOUR   DETAILS   HAS   BEEN   SUCCESSFULLY   SAVED   TO   OUR   DATABASE  ,   PLEASE   LOGIN   ONCE  .  .  .");
            res.redirect("/login");
        }
    })
})
router.get("/editprofile/:code",(req,res)=>{
    res.render("editprofile",{key:req.params.code});
})
router.put("/edit/:key/:id",(req, res, next)=>{
    User.findByIdAndUpdate(req.params.id, req.body.user , (err, updateprofile)=>{
        if(err){
            console.log(err)
        }
        else{
            if(req.params.key=="profile"){
            req.flash("success", "YOUR   PROFILE   HAS   BEEN   SUCCESSFULLY   UPDATED  .  .  .");
            res.redirect('/profile');}
            else if(req.params.key=="place"){
            req.flash("success", "YOUR   PROFILE   HAS   BEEN   SUCCESSFULLY   UPDATED  .  .  .");
            res.redirect('/placeorder/'+req.params.id);}
            else{
            req.flash("success", "YOUR   PROFILE   HAS   BEEN   SUCCESSFULLY   UPDATED  .  .  .");
            res.redirect('/buynow/'+req.params.key+'/'+req.params.id);
        }}
    })
})
router.get('/login', (req, res)=> {
    res.render('login');
})
router.post('/login', passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: "INVALID   USERNAME  OR   PASSWORD  !  !  !",
    successFlash: "WE   WELCOME   YOU   TO   OUR   WEBSITE   CLICK   AND   PICK  😃"
}),(req, res)=>{
});

router.get('/logout', (req, res)=>{
    req.logOut();
    req.flash("success", "LOGGING   YOU   OUT   SUCCESSFULLY  .  .  .");
    res.redirect("/home");
})
router.get('/profile', (req, res)=> {
    res.render('profile');
})

module.exports = router;
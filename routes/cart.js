var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var User = require('../models/user');

router.get('/cart/:id', (req, res)=> {
    User.findById(req.params.id).populate("cart").exec((err, user)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.render("cart", {user:user});
        }
    })
})
router.get('/cart/:productid/:userid', isLoggedin, (req, res)=>{
    var product = req.params.productid;
    var user = req.params.userid;
        User.findById(user, (err, founduser)=>{
        if(err){
            res.redirect("back")
        }
        else{
            founduser.cart.push(product);
            founduser.save();
            req.flash("success", "PRODUCT   ADDED   TO   CART   SUCCESSFULLY  !  !  !");
            res.redirect("/cart/"+ user);
        }
    })
})

router.get('/buy/:productid/:userid', isLoggedin, (req, res)=>{
    var product = req.params.productid;
    var user = req.params.userid;
        User.findById(user, (err, founduser)=>{
        if(err){
            res.redirect("back")
        }
        else{
            founduser.cart.push(product);
            founduser.save();
            res.redirect("/buynow/"+product+"/"+user);
        }
    })
})
router.get("/buynow/:productid/:userid", (req, res)=>{
    var product = req.params.productid;
    var user = req.params.userid;
    User.findById(user).populate("cart").exec((err, founduser)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            Product.findById(product, (err, foundproduct)=>{
                if(err){
                    res.redirect("back");
                }
                else{
                    res.render("buynow", {user:founduser,item:foundproduct});
                }
            })
        }
    })
})
router.get("/buy/:productid/remove/:userid", (req,res)=>{
    var user1 = req.params.userid;
    var product1 = req.params.productid;
    User.findById(user1, (err, founduser)=>{
        if(err){
            res.redirect("back");
        }
        else{
            founduser.cart.splice(founduser.cart.indexOf(product1),1);
            founduser.save();
            res.redirect("/buynow/"+product1+"/"+user1);
        }
    })
})
router.get("/buy/remove/:productid/:userid", (req,res)=>{
    var user1 = req.params.userid;
    var product1 = req.params.productid;
    User.findById(user1, (err, founduser)=>{
        if(err){
            res.redirect("back");
        }
        else{
            founduser.cart.pull(product1);
            founduser.save();
            res.redirect("/buynow/"+product1+"/"+user1);
        }
    })
})
router.get('/placeorder/:productid/:userid', isLoggedin, (req, res)=>{
    var product = req.params.productid;
    var user = req.params.userid;
        User.findById(user, (err, founduser)=>{
        if(err){
            res.redirect("back")
        }
        else{
            founduser.cart.push(product);
            founduser.save();
            res.redirect("/placeorder/"+ user);
        }
    })
})

router.get("/cart/:productid/remove/:userid", (req,res)=>{
    var user1 = req.params.userid;
    var product1 = req.params.productid;
    User.findById(user1, (err, founduser)=>{
        if(err){
            res.redirect("back");
        }
        else{
            founduser.cart.splice(founduser.cart.indexOf(product1),1);
            founduser.save();
            req.flash("success", "PRODUCT   REMOVED   FROM   THE   CART   SUCCESSFULLY  !  !  !");
            res.redirect("/cart/"+ user1);
        }
    })
})
router.get("/placeorder/:productid/remove/:userid", (req,res)=>{
    var user1 = req.params.userid;
    var product1 = req.params.productid;
    User.findById(user1, (err, founduser)=>{
        if(err){
            res.redirect("back");
        }
        else{
            founduser.cart.splice(founduser.cart.indexOf(product1),1);
            founduser.save();
            res.redirect("/placeorder/"+ user1);
        }
    })
})
router.get("/cart/remove/:productid/:userid", (req,res)=>{
    var user1 = req.params.userid;
    var product1 = req.params.productid;
    User.findById(user1, (err, founduser)=>{
        if(err){
            res.redirect("back");
        }
        else{
            founduser.cart.pull(product1);
            founduser.save();
            req.flash("success", "PRODUCT   REMOVED   FROM   THE   CART   SUCCESSFULLY  !  !  !");
            res.redirect("/cart/"+ user1);
        }
    })
})
router.get("/placeorder/remove/:productid/:userid", (req,res)=>{
    var user1 = req.params.userid;
    var product1 = req.params.productid;
    User.findById(user1, (err, founduser)=>{
        if(err){
            res.redirect("back");
        }
        else{
            founduser.cart.pull(product1);
            founduser.save();
            res.redirect("/placeorder/"+ user1);
        }
    })
})
router.get("/placeorder/:id",(req,res)=>{
    User.findById(req.params.id).populate("cart").exec((err, founduser)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.render("placeorder",{user:founduser});
        }
    })
})

router.get('/order/:id', (req, res)=> {
    User.findById(req.params.id).populate("order").exec((err, user)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.render("order", {user:user});
        }
    })
})

function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to Login First");
    res.redirect('/login');
}
function isAdmin(req, res, next){
    if(req.user.isAdmin){
        return next();
    }
    res.redirect('back');
}

module.exports = router;
var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/', (req, res)=>{
    res.redirect('/home');
})
router.get('/home', (req, res)=> {
    Product.find({}, (err, products)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.render("home", {products:products})
        }
    })
})
router.post('/home', (req, res)=>{
    Product.create(req.body.product, (err, newProduct)=>{
        if(err){
            res.redirect("back");
        }
        else{
            newProduct.save();
            res.redirect('/home');
        }
    })
})
router.get("/home/:id", (req, res)=>{
    Product.findById(req.params.id, (err,foundProduct)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.render("product",{product: foundProduct})
        }
    })
})
router.get("/catalogue/:id", (req, res)=>{
    Product.find({category:req.params.id}, (err, found)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.render("catalogue",{products:found})
        }
    })
})
router.get('/admin',isAdmin,(req, res)=>{
    res.render("admin");
})
router.get("/home/:id/update" ,isAdmin , (req,res) => {
    Product.findById(req.params.id , (err,found) => {
        if(err){
            res.redirect("back");
            console.log(err);
        } else{
            res.render("admin",{product : found});
        }
    });
});
router.put("/home/:id", (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body.product, {new: true}, (err, update) => {
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            res.redirect("/home/"+req.params.id);
        }
    })
})
router.delete("/home/delete/:id", isAdmin , function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/home");
        }
    })
})

function isAdmin(req, res, next){
    if(req.user.isAdmin){
        return next();
    }
    res.redirect('back');
}

module.exports = router;
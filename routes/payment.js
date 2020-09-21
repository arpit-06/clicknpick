var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Product = require('../models/product');

router.get('/method', (req, res)=>{
    res.render("payment");
})
router.post('/method/:id', (req,res)=>{
    User.findById(req.params.id).populate("cart").exec((err,founduser)=>{
        if(req.body.payment=="COD"){

        res.render("invoice",{method:req.body.payment,user: founduser});}
        else{
        res.redirect("/online");
        }
        founduser.cart.forEach((product)=>{
            founduser.order.push(product);
            founduser.save();
        })
    })
})
router.get('/online',(req, res)=>{
    res.render('online');
})
router.post('/online/:id',(req,res)=>{
    User.findById(req.params.id).populate("cart").exec((err,founduser)=>{
    if(err)
    {
        res.redirect("back");
    }    
    else{

        res.render("invoice",{method:"ONLINE",user: founduser});
    }
})
})
router.get('/method1/:id', (req, res)=>{
    Product.findById(req.params.id , (err,item)=>{
        res.render("payment1",{item:item});
    })
})
router.post('/method1/:pid/:uid', (req,res)=>{
    User.findById(req.params.uid).populate("cart").exec((err,founduser)=>{
        Product.findById(req.params.pid,(err, foundproduct)=>{
            if(req.body.payment=='COD'){
        
            res.render("invoice1",{method:req.body.payment,user: founduser,item: foundproduct})}
            else{
                res.redirect('/online1/'+req.params.pid);
            }
            founduser.order.push(foundproduct);
            founduser.save();
        })
    })
})
router.get('/online1/:id', (req, res)=>{
    Product.findById(req.params.id , (err,item)=>{
        res.render("online1",{item:item});
    })
})
router.post('/online1/:pid/:uid',(req,res)=>{
    User.findById(req.params.uid).populate("cart").exec((err,founduser)=>{
        Product.findById(req.params.pid , (err,foundproduct)=>{
            if(err)
            {
            res.redirect("back");
            }    
            else{
        
            res.render("invoice1",{method:"ONLINE",user: founduser,item: foundproduct});
            }
        })
    })
})

module.exports = router;
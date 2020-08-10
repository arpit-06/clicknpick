var express = require('express'),
    app     = express(),
    body    = require('body-parser')

app.use(body.urlencoded({extended:true}));
app.use(express.static(__dirname+ "/public"));
app.set("view engine", "ejs");

app.get('/', (req, res)=> {
    res.render('home');
})
app.get('/product', (req, res)=> {
    res.render('product');
})
app.get('/cart', (req, res)=> {
    res.render('cart');
})
app.get('/profile', (req, res)=> {
    res.render('profile');
})
app.get('/catalogue', (req, res)=> {
    res.render('catalogue');
})
app.get('/login', (req, res)=> {
    res.render('login');
})
app.get('/register', (req, res)=> {
    res.render('register');
})

app.listen(3000, ()=>{
    console.log("Click and Pick is running on port 3000");
})
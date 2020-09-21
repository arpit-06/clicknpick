var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
    name: String,
    mobile: String,
    address: String,
    profile:String,
    cart:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
        }
    ],
    order:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
        }
    ]
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
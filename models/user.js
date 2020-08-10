var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const { urlencoded } = require("body-parser");
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    mobile: String,
    address: String,
    profile:String,
    cart:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
        }
    ]
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
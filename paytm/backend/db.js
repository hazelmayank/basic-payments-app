const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mayankjeefinal:Mayank%406696@mayankfirstdb.vva4taq.mongodb.net/paytm");

const Userschema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 30,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,         
        required: true
    }
});

const User = mongoose.model("User", Userschema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
};

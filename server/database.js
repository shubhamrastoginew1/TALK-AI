const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb+srv://shubhamrastogi704:shubhamdb@cluster0.pyyl44d.mongodb.net/');

connect.then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("DB error");
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chats: {
        type: [ String ]
    }
});

module.exports = new mongoose.model("User", userSchema);
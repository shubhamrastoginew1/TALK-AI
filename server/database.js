const mongoose = require('mongoose');
require('dotenv').config();

const connect = mongoose.connect(`mongodb+srv://${[ process.env.DB_USERNAME ]}:${process.env.DB_PASSWORD}@cluster0.pyyl44d.mongodb.net/`);
connect.then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("DB error");
    console.log(process.env);
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
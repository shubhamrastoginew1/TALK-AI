const express = require('express')
const app = express()
const cors = require('cors');
const port = 4000
const User = require('./database');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const USER = await User.find({ email: email });
    console.log(USER);
    if (USER.length !== 0) {
        let complete = -1;
        let isMatched = await bcrypt.compare(password, USER[ 0 ].password);
        if(isMatched){
            console.log("pass check passed");
            res.redirect('http://localhost:3000/speech');
        }
        else{
            console.log("wrong password");
            res.redirect('http://localhost:3000');
        }
        return;
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email: email,
            password: hashedPassword,
            chats: []
        });
        await user.save().then(() => {
            console.log("new user added");
        }).catch((e) => {
            console.log(e);
        });
    }
    res.redirect('http://localhost:3000/speech');
    return;
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
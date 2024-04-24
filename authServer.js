const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT_AUTH;
const router = require("./src/router/router.js");
const connection = require("./src/db/db.js");
const session = require('express-session');

app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.json());

app.use('/auth',router);

app.use('/v1', router);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`);

    connection.connect(() => {
        console.log("DB IS CONNECTED !");
    })
})
const jwt = require('jsonwebtoken');
const connection = require('../db/db.js');
const Account = require('../model/account.js');
require('dotenv').config();

async function checkToken(req, res, next){
    const authHeader = req.header("authorization");
    const token = authHeader.split(' ')[1];
   
    if(!authHeader){
        return res.status(401);
    }

    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        console.log(decode);
        const id = decode.id_acc;

        const refreshToken = jwt.sign(decode, process.env.SECRET_KEY_REFRESH_TOKEN);
    
        console.log(id); 

        const account = new Account(id, null, null, null, refreshToken);
        
        await account.generateRefreshToken();

        next();
    }catch(error){
        res.status(403).send(error);
    }
}

module.exports = checkToken;
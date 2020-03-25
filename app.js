const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
       message: 'welcome to the api'
   }) 
});

app.post('/api/posts',verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            // res.sendStatus(403);
            // console.log('forbidded route')
            // res.redirect('/api')
            res.json({
                message: 'token expired or invalid',
            })
        } else {
            res.json({
                message: 'post created',
                authData
            })                      
        }
    });
});

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'asif',
        email: 'asif@gmail.com'
    }

    jwt.sign({ user: user }, 'secretkey', {expiresIn:'30s'} ,    (err, token) => {
        res.json({
            token: token
        })
    });
});

//verify token
function verifyToken(req,res,next) {
    //get the auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer undefined
    if (typeof bearerHeader != 'undefined') {
        //split the bearer
        console.log(bearerHeader)
        const bearer = bearerHeader.split(' ');
        console.log(bearer)
        //get token from array 
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middle ware
        next();
    } else {
    
        res.status(301).json({
            message: 'unauthorized you are'
        });
       


    }
}

app.listen(3000,()=>console.log('server 3000 running...'))
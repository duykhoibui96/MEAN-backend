var express = require('express');
var jwt = require('jsonwebtoken');
var secretKey = require('../config/secret-key.json').key;

var router = express.Router();

router.use((req, res, next) => {

    let method = req.method;
    let path = req.originalUrl;
    let token = req.headers['token'];

    if (method === 'OPTIONS' || path.includes('authentication'))
        next();
    else {
        if (!token)
            res.status(401).send();
        else if (!jwt.verify(token,secretKey))
            res.status(403).send();
        else
            next();
    }


})

router.post('accounts/authentication', (req,res) => {

    let payload = {}
    let token = jwt.sign(payload,secretKey);

})

module.exports = router;
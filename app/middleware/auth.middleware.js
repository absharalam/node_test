'use strict';



const ResponseService = require('../services/response.service');
const apiRes = require("../../config/macro/api-error");
const jwt = require('jsonwebtoken');
const fs = require('fs');

// check app key with all api of this app
module.exports.verifyAppKey = function(req, res, next){
    let appKey = req.headers['x-app-key'];
    if(!appKey) 
        return ResponseService.unauthorized(res, "You don't have permission.")

    if(appKey !== process.env.X_APP_KEY)
        return ResponseService.unauthorized(res, "You don't have permission.")
    if(appKey === process.env.X_APP_KEY)
        return next();
}

// verify JSON WEB token with authenticate routes
module.exports.verifyToken = function(req, res, next){
    let token = req.headers['x-auth-token'];
    if (!token) 
        return ResponseService.badParameter(res, apiRes.NO_AUTH_TOKEN)
    var privateKey = fs.readFileSync('././resources/key/key.pem');
    jwt.verify(token, privateKey, {ignoreExpiration: true}, function(err, decoded) {
        if (err){
            if(err.name === 'TokenExpiredError')
                return ResponseService.tokenExpired(res, apiRes.TOKEN_EXPIRED)
            return ResponseService.unauthorized(res, apiRes.UNAUTHORIZED)
        }
        req.decoded = decoded;
        // console.log('admin', decoded)
        next();
    });
}
// verify JSON WEB token with authenticate routes == ignoreExpiration = false
module.exports.verifyTokenAndCheckExpiryDate = function(req, res, next){
    let token = req.headers['x-auth-token'];
    if (!token) 
        return ResponseService.badParameter(res, apiRes.NO_AUTH_TOKEN)
    var privateKey = fs.readFileSync('././resources/key/KuponProdEC2.pem');
    jwt.verify(token, privateKey, {ignoreExpiration: false}, function(err, decoded) {
        if (err){
            if(err.name === 'TokenExpiredError')
                return ResponseService.tokenExpired(res, apiRes.TOKEN_EXPIRED)
            return ResponseService.unauthorized(res, apiRes.UNAUTHORIZED)
        }
        req.decoded = decoded;
        next();
    });
}

//restrict routes roles based verification
module.exports.roleAuthorized = (...role) => {
    return (req, res, next) => {
        try{
            if(role.indexOf(req.decoded.role) === -1){
                return ResponseService.unauthorized(res, "You don't have permission.")
            }
            next();
        }catch(err){
            next(err);
        }
    }

}

//check require API headers
module.exports.checkAPIHeaders = (req, res, next) => {
    if(req.headers['app-lang'] === undefined || ['1', '2'].indexOf(req.headers['app-lang']) === -1){
        return res.status(apiRes.CODE_400).send({ status: 'fail', message: 'app-lang header is missing' });
    }
    if(req.headers['device-type'] === undefined || ['1', '2', '3', '4'].indexOf(req.headers['device-type']) === -1){
        return res.status(apiRes.CODE_400).send({ status: 'fail', message: 'device-type header is missing' });
    }
    // req.body.appLang = parseInt(req.headers['app-lang']);
    // req.body.deviceType = parseInt(req.headers['device-type']);
    next();
}
//check version of device API headers
module.exports.checkClientVersion = (req, res, next) => {
    if(req.headers['android-version'] !== undefined && req.headers['android-version'] !== "130"){
        return res.status(apiRes.CODE_406).send({ status: 'fail', message: 'ANDROID_VERSION_MISMATCHED' });
    }
    if(req.headers['ios-version'] !== undefined && req.headers['ios-version'] !== "2.24"){
        return res.status(apiRes.CODE_406).send({ status: 'fail', message: 'IOS_VERSION_MISMATCHED' });
    }
    if(req.headers['angular-version'] !== undefined && req.headers['angular-version'] !== "1.437"){
        return res.status(apiRes.CODE_406).send({ status: 'fail', message: 'ANGULAR_VERSION_MISMATCHED' });
    }
    // req.body.appLang = parseInt(req.headers['app-lang']);
    // req.body.deviceType = parseInt(req.headers['device-type']);
    next();
}
const route = require("express").Router();
const userCtrl = require('../app/controllers/user.controller');
const authMiddleware = require('../app/middleware/auth.middleware');


// check header middleware
route.use(authMiddleware.checkAPIHeaders);
// check client version




// ############### User Ad/Post ##################
// route.get('/user/ads', authMiddleware.verifyToken, userCtrl.getUserPost);
// ############### End ###########################



module.exports = route;
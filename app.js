const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();


app.use(express.urlencoded({limit: '3000mb', extended: false, parameterLimit: 100000}));
app.use(express.json({limit: '3000mb', parameterLimit: 100000}));

app.use(cors());
// routes =======================================================================
const api = require('./routes/api.routes');
app.use(process.env.BASE_URL, api);

//generate error route not found
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("Invalid api");
    next(error);
})
//end
//404 error handle
if(process.env.ENVIRONMENT === "PRODUCTION"){
    app.use((error, req, res, next) => {
        res.status(req.status || 500).send({
            message: error.message
        })
    }); 
}
app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
        message: error.message,
        stack: error.stack
    })
});
//end

app.listen(process.env.SERVER_PORT || 9000, function(){
    console.log('Server is running on '+ process.env.SERVER_PORT);
});
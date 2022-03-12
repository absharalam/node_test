'use strict'


const moment = require("moment");
// const request = require("request");
const http = require("https");
const jwt = require('jsonwebtoken');
const fs = require('fs');


module.exports = {
    epochTimestamp: () => {
        return moment().tz('Asia/Riyadh').unix();
    }
}

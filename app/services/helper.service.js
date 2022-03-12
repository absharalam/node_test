'use strict'


const moment = require("moment");

module.exports = {
    epochTimestamp: () => {
        return moment().tz('Asia/Riyadh').unix();
    }
}

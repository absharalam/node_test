'use strict'


module.exports = {
    unauthorized: (res, message) => {
        return res.status(401).send({status: 'fail', errorMessage: message});
    },
    tokenExpired: (res, message) => {
        return res.status(403).send({status: 'fail', errorMessage: message});
    },
    badParameter: (res, message) => {
        return res.status(400).send({status: 'fail', errorMessage: message});
    },
    internelServerError: (res, message) => {
        return res.status(500).send({status: 'fail', errorMessage: message});
    },
    errorWithData: (res, code, message, errorData) => {
        return res.status(code).send({status: 'fail', errorMessage: message, data: errorData});
    },
    success: (res, message, data = null, customHeader = {}) => {
        let response = {
            status: 'success',
            message: (message !== '') ? message : '',
            enableCOD: process.env.ENABLE_COD,
            enableMPGS: process.env.ENABLE_MPGS
        }
        if(data !== null){
            response.data = data
        }
        let header = {
            "Access-Control-Expose-Headers": ["Server-Time"],
            'Server-Time': new Date().getTime()
        }
        let mergedHeader = {...header, ...customHeader};
        return res.status(200).set(mergedHeader).send(response);
    },
    successWithData : (res, data, customHeader = {}) => {
        let response = {
            status: 'success',
            data: data,
            enableCOD: process.env.ENABLE_COD,
            enableMPGS: process.env.ENABLE_MPGS
        }
        let header = {
            "Access-Control-Expose-Headers": ["Server-Time"],
            'Server-Time': new Date().getTime()
        }
        let mergedHeader = {...header, ...customHeader};
        return res.status(200).set(mergedHeader).send(response);
    },
}
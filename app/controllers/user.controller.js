'use strict'

const responseService = require('../services/response.service');
const userService = require('../services/user.service');

module.exports = {
    createEmployee: (req, res) => {
        if(req.body.firstName === undefined || req.body.firstName === null || req.body.firstName === ""){
            return responseService.badParameter(res, "firstName is missing");
        }
        if(req.body.lastName === undefined || req.body.lastName === null || req.body.lastName === ""){
            return responseService.badParameter(res, "lastName is missing");
        }
        if(req.body.email === undefined || req.body.email === null || req.body.email === ""){
            return responseService.badParameter(res, "email is missing");
        }
        if(req.body.password === undefined || req.body.password === null || req.body.password === ""){
            return responseService.badParameter(res, "password is missing");
        }
        if(req.body.mobile === undefined || req.body.mobile === null || req.body.mobile === ""){
            return responseService.badParameter(res, "mobile is missing");
        }

        return userService.createEmployee(req.body)
        .then(() => {
            return responseService.success(res, 'EMPLOYEE_CREATED');
        })
        .catch(error => {
            return responseService.internelServerError(res, error.message);
        })
    },
   
}
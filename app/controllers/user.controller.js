'use strict'

const responseService = require('../services/response.service');
const userService = require('../services/user.service');

module.exports = {
    createEmployee: (req, res) => {
        if(req.body.employeeName === undefined || req.body.employeeName === null || req.body.employeeName === ""){
            return responseService.badParameter(res, "firstName is missing");
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
    getEmployeeList: (req, res) => {
        return userService.getEmployeeList(req.query)
        .then((data) => {
            return responseService.successWithData(res, data);
        })
        .catch(error => {
            return responseService.internelServerError(res, error.message);
        })
    },
    getEmployeeDetail: (req, res) => {
        if(req.params.employeeId === undefined || req.params.employeeId === null || req.params.employeeId === ""){
            return responseService.badParameter(res, "employeeId is missing");
        }
        return userService.getEmployeeDetail(req.params)
        .then((data) => {
            return responseService.successWithData(res, data);
        })
        .catch(error => {
            return responseService.internelServerError(res, error.message);
        })
    },
    updateEmployeeDetail: (req, res) => {
        if(req.params.employeeId === undefined || req.params.employeeId === null || req.params.employeeId === ""){
            return responseService.badParameter(res, "employeeId is missing");
        }
        req.body.employeeId = req.params.employeeId;
        
        return userService.updateEmployeeDetail(req.body)
        .then(() => {
            return responseService.success(res, "EMPLOYEE_UPDATED");
        })
        .catch(error => {
            return responseService.internelServerError(res, error.message);
        })
    },

   
}